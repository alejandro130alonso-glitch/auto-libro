import { Escaleta } from '../types';

export function buildChapterPrompt(
  escaleta: Escaleta,
  numeroCapitulo: number,
  resumenesAnteriores: string[]
): string {
  const capitulo = escaleta.capitulos.find(c => c.numero === numeroCapitulo);
  if (!capitulo) throw new Error(`Capítulo ${numeroCapitulo} no encontrado`);

  const acto = escaleta.actos.find(a => a.id === capitulo.actoId);

  const semillasActivo = escaleta.semillas.filter(s => {
    const parseCaps = (str: string) =>
      str.replace(/[^\d,\-]/g, '').split(/[,\-]/).map(n => parseInt(n.trim())).filter(Boolean);
    return parseCaps(s.siembra).includes(numeroCapitulo) || parseCaps(s.cobro).includes(numeroCapitulo);
  });

  const antagonistaRespuesta = escaleta.momentosAntagonista.find(m => {
    const caps = m.despuesDeCapitulo.replace(/[^\d,\-]/g, '').split(/[,\-]/).map(n => parseInt(n.trim())).filter(Boolean);
    return caps.includes(numeroCapitulo - 1);
  });

  const resumenAnterior = resumenesAnteriores.length > 0
    ? `\n## RESUMEN DE CAPÍTULOS ANTERIORES\n${resumenesAnteriores.slice(-5).join('\n')}`
    : '';

  const semillasStr = semillasActivo.length > 0
    ? `\n## SEMILLAS ACTIVAS EN ESTE CAPÍTULO\n${semillasActivo.map(s => `- ${s.elemento}: ${s.nota}`).join('\n')}`
    : '';

  const antagonistaStr = antagonistaRespuesta
    ? `\n## RESPUESTA DEL ANTAGONISTA EN ESTE CAPÍTULO\n${antagonistaRespuesta.respuestaObligatoria}`
    : '';

  return `Escribe el CAPÍTULO ${numeroCapitulo}: "${capitulo.titulo}"

**Acto:** ${acto?.titulo ?? 'N/A'} (${acto?.tono ?? ''})
**Función dramática:** ${capitulo.funcionDramatica}
**Giro funcional:** ${capitulo.giroFuncional}
**Cliffhanger o cierre:** ${capitulo.cliffhanger}
**Cambio en el protagonista:** ${capitulo.cambioProt}
${resumenAnterior}${semillasStr}${antagonistaStr}

Escribe el capítulo completo ahora, con aproximadamente ${escaleta.configIA.longitudPalabras} palabras. Comienza directamente con el contenido narrativo.`;
}
