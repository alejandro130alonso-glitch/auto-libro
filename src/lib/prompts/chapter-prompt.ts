import { Escaleta, Capitulo, CapituloGenerado } from '../types';
import { buildEscaletaSystemPrompt } from './escaleta-prompt';

export function buildChapterSystemPrompt(escaleta: Escaleta): string {
  return `Eres un escritor profesional de novelas. Tu tarea es escribir capítulos de una novela basándote ESTRICTAMENTE en la escaleta proporcionada. Cada capítulo debe seguir exactamente las instrucciones: función dramática, giro funcional, cliffhanger y cambio en el protagonista. Escribe prosa narrativa de alta calidad, sin metadatos ni comentarios al final.

${buildEscaletaSystemPrompt(escaleta)}`;
}

export function buildChapterPrompt(
  escaleta: Escaleta,
  capitulo: Capitulo,
  capitulosAnteriores: CapituloGenerado[],
  numeroTotal: number
): string {
  const semillasRelevantes = escaleta.semillas.filter(s => {
    const siembraCapitulos = s.siembra.split(/[\s,yY]+/).map(n => parseInt(n)).filter(n => !isNaN(n));
    const cobroCapitulos = s.cobro.split(/[\s,yY]+/).map(n => parseInt(n)).filter(n => !isNaN(n));
    return siembraCapitulos.includes(capitulo.numero) || cobroCapitulos.includes(capitulo.numero);
  });

  const antagonistaRespuesta = escaleta.antagonistaMomentos.find(m => {
    const capNum = parseInt(m.despuesDeCapitulo);
    return capNum === capitulo.numero - 1;
  });

  const resumenAnteriores = capitulosAnteriores.length > 0
    ? capitulosAnteriores.slice(-5).map(c => `Cap. ${c.numero} - ${c.titulo}: ${c.resumen}`).join('\n')
    : 'Este es el primer capítulo.';

  const semillasTexto = semillasRelevantes.length > 0
    ? semillasRelevantes.map(s => {
        const siembraCapitulos = s.siembra.split(/[\s,yY]+/).map(n => parseInt(n)).filter(n => !isNaN(n));
        const esSiembra = siembraCapitulos.includes(capitulo.numero);
        return `- ${esSiembra ? 'SEMBRAR' : 'COBRAR'}: ${s.elemento}. Nota: ${s.nota}`;
      }).join('\n')
    : 'Ninguna semilla específica para este capítulo.';

  return `Escribe el capítulo ${capitulo.numero} de ${numeroTotal} de la novela.

CAPÍTULOS ANTERIORES (resumen de los últimos):
${resumenAnteriores}

INSTRUCCIONES PARA ESTE CAPÍTULO:
- Número: ${capitulo.numero}
- Título: ${capitulo.titulo}
- Función dramática: ${capitulo.funcionDramatica}
- Giro funcional: ${capitulo.giroFuncional}
- Cliffhanger o cierre: ${capitulo.cliffhanger}
- Cambio en el protagonista: ${capitulo.cambioProtagonista}

SEMILLAS EN ESTE CAPÍTULO:
${semillasTexto}

${antagonistaRespuesta ? `RESPUESTA DEL ANTAGONISTA (obligatoria en este capítulo):
${antagonistaRespuesta.respuestaObligatoria}` : ''}

LÍNEAS ROJAS A RESPETAR:
${escaleta.lineasRojas.map(l => `• ${l}`).join('\n') || 'Ver escaleta general.'}

CHECKLIST DE REDACCIÓN:
${escaleta.checklistRedaccion.map(c => `• ${c}`).join('\n') || 'Ver escaleta general.'}

Configuración:
- Longitud: ~${escaleta.configIA.palabrasPorCapitulo} palabras
- Tono: ${escaleta.configIA.tonoNarrativo}
- Idioma: ${escaleta.configIA.idioma}

Escribe SOLO el contenido narrativo del capítulo, comenzando directamente con la prosa. No incluyas el número de capítulo ni el título al inicio, ni metadatos ni comentarios al final.`;
}
