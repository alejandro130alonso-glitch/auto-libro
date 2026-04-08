export interface ADNLibro {
  mundo: string;
  motor: string;
  centroEmocional: string;
  centroIdeologico: string;
  finalObligatorio: string;
}

export interface Personaje {
  id: string;
  nombre: string;
  rol: 'protagonista' | 'antagonista' | 'mentor' | 'aliado' | 'anclaEmocional' | 'otro';
  funcionArco: string;
  voz: string;
}

export interface Acto {
  id: string;
  titulo: string;
  tono: string;
  funcionNarrativa: string;
  notaEditorial: string;
}

export interface Capitulo {
  id: string;
  actoId: string;
  numero: number;
  titulo: string;
  funcionDramatica: string;
  giroFuncional: string;
  cliffhanger: string;
  cambioProt: string;
  contenido?: string;
}

export interface Semilla {
  id: string;
  elemento: string;
  siembra: string;
  cobro: string;
  nota: string;
}

export interface MomentoAntagonista {
  id: string;
  despuesDeCapitulo: string;
  respuestaObligatoria: string;
}

export interface ConfigIA {
  proveedor: 'openai' | 'gemini' | 'claude';
  apiKey: string;
  modelo: string;
  longitudPalabras: number;
  idioma: string;
  tonoNarrativo: string;
}

export interface Escaleta {
  adn: ADNLibro;
  personajes: Personaje[];
  actos: Acto[];
  capitulos: Capitulo[];
  semillas: Semilla[];
  momentosAntagonista: MomentoAntagonista[];
  lineasRojas: string[];
  checklistRedaccion: string[];
  configIA: ConfigIA;
}

export interface EstadoGeneracion {
  capituloActual: number;
  totalCapitulos: number;
  capitulos: Capitulo[];
  resumenCapitulosAnteriores: string[];
  completado: boolean;
  pausado: boolean;
  error?: string;
}

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface WizardState {
  pasoActual: WizardStep;
  escaleta: Escaleta;
}
