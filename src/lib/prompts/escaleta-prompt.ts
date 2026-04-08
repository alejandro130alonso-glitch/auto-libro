import { Escaleta } from '../types';

export function buildEscaletaSystemPrompt(escaleta: Escaleta): string {
  const { adn, personajes, actos, capitulos, semillas, antagonistaMomentos, lineasRojas, checklistRedaccion, configIA } = escaleta;

  const personajesText = personajes.map(p =>
    `- ${p.nombre} (${p.funcionNarrativa}): Arco: ${p.arco}. Voz: ${p.voz}`
  ).join('\n');

  const actosText = actos.map(a =>
    `- ${a.titulo}: Tono: ${a.tono}. Función: ${a.funcionNarrativa}. Nota editorial: ${a.notaEditorial}`
  ).join('\n');

  const semillasText = semillas.map(s =>
    `- ${s.elemento}: Siembra en ${s.siembra}, Cobro en ${s.cobro}. Nota: ${s.nota}`
  ).join('\n');

  const antagonistaText = antagonistaMomentos.map(m =>
    `- Después del cap. ${m.despuesDeCapitulo}: ${m.respuestaObligatoria}`
  ).join('\n');

  // Use capitulos to avoid unused variable warning
  const capitulosCount = capitulos.length;

  return `ESCALETA COMPLETA DE LA NOVELA (${capitulosCount} capítulos)
================================

ADN DEL LIBRO:
- Mundo: ${adn.mundo}
- Motor del libro: ${adn.motorLibro}
- Centro emocional: ${adn.centroEmocional}
- Centro ideológico: ${adn.centroIdeologico}
- Final obligatorio: ${adn.finalObligatorio}

PERSONAJES Y ARCOS:
${personajesText}

ESTRUCTURA DE ACTOS:
${actosText}

SEMILLAS Y PAYOFFS:
${semillasText || 'Sin semillas definidas'}

APRENDIZAJE ADAPTATIVO DEL ANTAGONISTA:
${antagonistaText || 'Sin momentos definidos'}

LÍNEAS ROJAS (nunca deben ocurrir):
${lineasRojas.map(l => `• ${l}`).join('\n') || 'Sin líneas rojas definidas'}

CHECKLIST DE REDACCIÓN (cada capítulo debe cumplir):
${checklistRedaccion.map(c => `• ${c}`).join('\n') || 'Sin checklist definido'}

CONFIGURACIÓN:
- Idioma: ${configIA.idioma}
- Tono narrativo: ${configIA.tonoNarrativo}
- Palabras por capítulo: ~${configIA.palabrasPorCapitulo}`;
}

export function buildEscaletaPrompt(_escaleta: Escaleta): string {
  return `Por favor, genera un resumen estructurado y bien formateado de la siguiente escaleta literaria. 
Organízalo claramente con secciones, listas y formato legible para revisión editorial.
Incluye todos los elementos: ADN del libro, personajes, actos, capítulos, semillas, líneas rojas y checklist.`;
}
