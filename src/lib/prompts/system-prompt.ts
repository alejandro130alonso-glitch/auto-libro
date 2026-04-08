import { Escaleta } from '../types';

export function buildSystemPrompt(escaleta: Escaleta): string {
  const { adn, personajes, actos, semillas, momentosAntagonista, lineasRojas, checklistRedaccion, configIA } = escaleta;

  const personajesStr = personajes
    .map(p => `- ${p.nombre} (${p.rol}): ${p.funcionArco}. Voz: ${p.voz}`)
    .join('\n');

  const actosStr = actos
    .map(a => `- ${a.titulo}: ${a.tono}. ${a.funcionNarrativa}. Nota editorial: ${a.notaEditorial}`)
    .join('\n');

  const semillasStr = semillas
    .map(s => `- ${s.elemento}: siembra en ${s.siembra}, cobro en ${s.cobro}. ${s.nota}`)
    .join('\n');

  const momentosStr = momentosAntagonista
    .map(m => `- Después del capítulo ${m.despuesDeCapitulo}: ${m.respuestaObligatoria}`)
    .join('\n');

  const lineasRojasStr = lineasRojas.map(l => `• ${l}`).join('\n');
  const checklistStr = checklistRedaccion.map(c => `• ${c}`).join('\n');

  return `Eres un escritor experto de novelas. Debes escribir capítulos de un libro según la siguiente escaleta profesional. Escribe en ${configIA.idioma} con un tono ${configIA.tonoNarrativo}. Cada capítulo debe tener aproximadamente ${configIA.longitudPalabras} palabras.

## ADN DEL LIBRO

**Mundo:** ${adn.mundo}
**Motor del libro:** ${adn.motor}
**Centro emocional:** ${adn.centroEmocional}
**Centro ideológico:** ${adn.centroIdeologico}
**Final obligatorio:** ${adn.finalObligatorio}

## PERSONAJES Y ARCOS

${personajesStr}

## ESTRUCTURA DE ACTOS

${actosStr}

## SEMILLAS Y PAYOFFS

${semillasStr}

## APRENDIZAJE ADAPTATIVO DEL ANTAGONISTA

${momentosStr}

## LÍNEAS ROJAS (nunca hacer esto)

${lineasRojasStr}

## CHECKLIST DE REDACCIÓN (siempre cumplir)

${checklistStr}

## INSTRUCCIONES GENERALES

- Escribe únicamente el contenido del capítulo, sin meta-comentarios.
- Mantén coherencia con todos los personajes y eventos anteriores.
- Respeta las semillas sembradas y cobra las que correspondan.
- Cada capítulo debe terminar con tensión, cierre o cliffhanger según la escaleta.
- No saltes eventos importantes ni rellenes con atmósfera innecesaria.`;
}
