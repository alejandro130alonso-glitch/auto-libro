import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
} from 'docx';
import { saveAs } from 'file-saver';
import { Escaleta, Capitulo } from './types';

function makeHeading(text: string, level: typeof HeadingLevel[keyof typeof HeadingLevel]) {
  return new Paragraph({ text, heading: level, spacing: { before: 400, after: 200 } });
}

function makeBody(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, size: 24 })],
    spacing: { after: 200 },
  });
}

function makeLabelValue(label: string, value: string) {
  return new Paragraph({
    children: [
      new TextRun({ text: `${label}: `, bold: true, size: 24 }),
      new TextRun({ text: value, size: 24 }),
    ],
    spacing: { after: 100 },
  });
}

export async function exportarEscaleta(escaleta: Escaleta): Promise<void> {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      text: 'ESCALETA DEL LIBRO',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // ADN
  children.push(makeHeading('ADN DEL LIBRO', HeadingLevel.HEADING_1));
  children.push(makeLabelValue('Mundo', escaleta.adn.mundo));
  children.push(makeLabelValue('Motor del libro', escaleta.adn.motor));
  children.push(makeLabelValue('Centro emocional', escaleta.adn.centroEmocional));
  children.push(makeLabelValue('Centro ideológico', escaleta.adn.centroIdeologico));
  children.push(makeLabelValue('Final obligatorio', escaleta.adn.finalObligatorio));

  // Personajes
  children.push(makeHeading('PERSONAJES Y ARCOS', HeadingLevel.HEADING_1));
  for (const p of escaleta.personajes) {
    children.push(makeHeading(p.nombre || '(sin nombre)', HeadingLevel.HEADING_2));
    children.push(makeLabelValue('Rol', p.rol));
    children.push(makeLabelValue('Función en el arco', p.funcionArco));
    children.push(makeLabelValue('Voz', p.voz));
  }

  // Actos
  children.push(makeHeading('ESTRUCTURA DE ACTOS', HeadingLevel.HEADING_1));
  for (const a of escaleta.actos) {
    children.push(makeHeading(a.titulo, HeadingLevel.HEADING_2));
    children.push(makeLabelValue('Tono', a.tono));
    children.push(makeLabelValue('Función narrativa', a.funcionNarrativa));
    children.push(makeLabelValue('Nota editorial', a.notaEditorial));
  }

  // Capítulos
  children.push(makeHeading('CAPÍTULOS', HeadingLevel.HEADING_1));
  for (const c of escaleta.capitulos) {
    children.push(makeHeading(`Cap. ${c.numero}: ${c.titulo}`, HeadingLevel.HEADING_2));
    children.push(makeLabelValue('Función dramática', c.funcionDramatica));
    children.push(makeLabelValue('Giro funcional', c.giroFuncional));
    children.push(makeLabelValue('Cliffhanger/Cierre', c.cliffhanger));
    children.push(makeLabelValue('Cambio en el protagonista', c.cambioProt));
  }

  // Semillas
  if (escaleta.semillas.length > 0) {
    children.push(makeHeading('SEMILLAS Y PAYOFFS', HeadingLevel.HEADING_1));
    for (const s of escaleta.semillas) {
      children.push(makeHeading(s.elemento, HeadingLevel.HEADING_2));
      children.push(makeLabelValue('Siembra', s.siembra));
      children.push(makeLabelValue('Cobro', s.cobro));
      children.push(makeLabelValue('Nota', s.nota));
    }
  }

  // Momentos antagonista
  if (escaleta.momentosAntagonista.length > 0) {
    children.push(makeHeading('APRENDIZAJE ADAPTATIVO DEL ANTAGONISTA', HeadingLevel.HEADING_1));
    for (const m of escaleta.momentosAntagonista) {
      children.push(makeLabelValue(`Después del cap. ${m.despuesDeCapitulo}`, m.respuestaObligatoria));
    }
  }

  // Líneas rojas
  if (escaleta.lineasRojas.length > 0) {
    children.push(makeHeading('LÍNEAS ROJAS', HeadingLevel.HEADING_1));
    for (const l of escaleta.lineasRojas) {
      children.push(makeBody(`• ${l}`));
    }
  }

  // Checklist
  if (escaleta.checklistRedaccion.length > 0) {
    children.push(makeHeading('CHECKLIST DE REDACCIÓN', HeadingLevel.HEADING_1));
    for (const c of escaleta.checklistRedaccion) {
      children.push(makeBody(`• ${c}`));
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'escaleta.docx');
}

export async function exportarLibro(escaleta: Escaleta, capitulos: Capitulo[]): Promise<void> {
  const children: Paragraph[] = [];

  const titulo = escaleta.adn.mundo || 'Mi Libro';

  children.push(
    new Paragraph({
      text: titulo.toUpperCase(),
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 800 },
    })
  );

  for (const cap of capitulos) {
    if (!cap.contenido) continue;

    children.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    children.push(
      new Paragraph({
        text: `Capítulo ${cap.numero}`,
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 100 },
      })
    );

    children.push(
      new Paragraph({
        text: cap.titulo,
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 400 },
      })
    );

    const paragraphs = cap.contenido.split('\n').filter(p => p.trim());
    for (const para of paragraphs) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: para.trim(), size: 24 })],
          spacing: { after: 200 },
          indent: { firstLine: 720 },
        })
      );
    }
  }

  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'libro.docx');
}


