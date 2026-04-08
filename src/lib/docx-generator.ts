import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } from 'docx';
import { Escaleta, CapituloGenerado } from './types';

export async function generateBookDocx(
  _escaleta: Escaleta,
  capitulos: CapituloGenerado[],
  titulo: string = 'Mi Libro'
): Promise<Blob> {
  const children: Paragraph[] = [];

  // Título
  children.push(
    new Paragraph({
      text: titulo,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Índice
  children.push(
    new Paragraph({
      text: 'Índice',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    })
  );

  for (const cap of capitulos) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${cap.numero}. ${cap.titulo}`, size: 22 }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  // Capítulos
  for (const cap of capitulos) {
    children.push(
      new Paragraph({
        children: [new PageBreak()],
      })
    );

    children.push(
      new Paragraph({
        text: `Capítulo ${cap.numero}: ${cap.titulo}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 300 },
      })
    );

    const parrafos = cap.contenido.split('\n').filter(p => p.trim());
    for (const parrafo of parrafos) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: parrafo, size: 24 })],
          spacing: { after: 200 },
          indent: { firstLine: 720 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children,
    }],
  });

  return await Packer.toBlob(doc);
}

export async function generateEscaletaDocx(escaleta: Escaleta): Promise<Blob> {
  const { adn, personajes, actos, capitulos, semillas, antagonistaMomentos, lineasRojas, checklistRedaccion } = escaleta;
  const children: Paragraph[] = [];

  const addHeading = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel] = HeadingLevel.HEADING_1) => {
    children.push(new Paragraph({ text, heading: level, spacing: { before: 400, after: 200 } }));
  };

  const addText = (text: string, bold = false) => {
    children.push(new Paragraph({
      children: [new TextRun({ text, bold, size: 22 })],
      spacing: { after: 100 },
    }));
  };

  // Título
  addHeading('Escaleta del Libro', HeadingLevel.TITLE);

  // ADN
  addHeading('ADN del Libro');
  addText(`Mundo: ${adn.mundo}`);
  addText(`Motor del libro: ${adn.motorLibro}`);
  addText(`Centro emocional: ${adn.centroEmocional}`);
  addText(`Centro ideológico: ${adn.centroIdeologico}`);
  addText(`Final obligatorio: ${adn.finalObligatorio}`);

  // Personajes
  addHeading('Personajes y Arcos');
  for (const p of personajes) {
    addText(`${p.nombre} (${p.funcionNarrativa})`, true);
    addText(`  Arco: ${p.arco}`);
    addText(`  Voz: ${p.voz}`);
  }

  // Actos
  addHeading('Estructura de Actos');
  for (const a of actos) {
    addText(`${a.titulo}`, true);
    addText(`  Tono: ${a.tono}`);
    addText(`  Función: ${a.funcionNarrativa}`);
    addText(`  Nota editorial: ${a.notaEditorial}`);
  }

  // Capítulos
  addHeading('Capítulos');
  for (const c of capitulos) {
    addText(`Cap. ${c.numero}: ${c.titulo}`, true);
    addText(`  Función dramática: ${c.funcionDramatica}`);
    addText(`  Giro funcional: ${c.giroFuncional}`);
    addText(`  Cliffhanger: ${c.cliffhanger}`);
    addText(`  Cambio protagonista: ${c.cambioProtagonista}`);
  }

  // Semillas
  addHeading('Semillas y Payoffs');
  for (const s of semillas) {
    addText(`${s.elemento}`, true);
    addText(`  Siembra: ${s.siembra} → Cobro: ${s.cobro}`);
    addText(`  Nota: ${s.nota}`);
  }

  // Antagonista
  addHeading('Aprendizaje Adaptativo del Antagonista');
  for (const m of antagonistaMomentos) {
    addText(`Después del cap. ${m.despuesDeCapitulo}: ${m.respuestaObligatoria}`);
  }

  // Líneas Rojas
  addHeading('Líneas Rojas');
  for (const l of lineasRojas) {
    addText(`• ${l}`);
  }

  // Checklist
  addHeading('Checklist de Redacción');
  for (const c of checklistRedaccion) {
    addText(`• ${c}`);
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return await Packer.toBlob(doc);
}
