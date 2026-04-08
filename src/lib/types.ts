export interface ADNLibro {
  mundo: string;
  motorLibro: string;
  centroEmocional: string;
  centroIdeologico: string;
  finalObligatorio: string;
}

export interface Personaje {
  id: string;
  nombre: string;
  funcionNarrativa: string;
  arco: string;
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
  cambioProtagonista: string;
}

export interface Semilla {
  id: string;
  elemento: string;
  siembra: string;
  cobro: string;
  nota: string;
}

export interface AntagonistaMomento {
  id: string;
  despuesDeCapitulo: string;
  respuestaObligatoria: string;
}

export interface ConfigIA {
  proveedor: 'openai' | 'gemini' | 'claude';
  apiKey: string;
  modelo: string;
  palabrasPorCapitulo: number;
  idioma: string;
  tonoNarrativo: string;
}

export interface Escaleta {
  adn: ADNLibro;
  personajes: Personaje[];
  actos: Acto[];
  capitulos: Capitulo[];
  semillas: Semilla[];
  antagonistaMomentos: AntagonistaMomento[];
  lineasRojas: string[];
  checklistRedaccion: string[];
  configIA: ConfigIA;
}

export interface CapituloGenerado {
  numero: number;
  titulo: string;
  contenido: string;
  resumen: string;
}

export interface EstadoGeneracion {
  capitulos: CapituloGenerado[];
  enProgreso: boolean;
  pausado: boolean;
  capituloActual: number;
  totalCapitulos: number;
  error: string | null;
}

export const MODELOS_POR_PROVEEDOR: Record<string, string[]> = {
  openai: ['gpt-4o', 'gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  gemini: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
  claude: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
};

export const PALABRAS_OPCIONES = [1000, 2000, 3000, 5000];

export const TONOS_NARRATIVOS = [
  'literario', 'comercial', 'juvenil', 'oscuro', 'épico', 'intimista', 'thriller',
];

export const DEFAULT_ESCALETA: Escaleta = {
  adn: {
    mundo: '',
    motorLibro: '',
    centroEmocional: '',
    centroIdeologico: '',
    finalObligatorio: '',
  },
  personajes: [
    { id: '1', nombre: '', funcionNarrativa: 'protagonista', arco: '', voz: '' },
    { id: '2', nombre: '', funcionNarrativa: 'antagonista', arco: '', voz: '' },
  ],
  actos: Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 1),
    titulo: `Acto ${i + 1}`,
    tono: '',
    funcionNarrativa: '',
    notaEditorial: '',
  })),
  capitulos: Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
    actoId: String(Math.floor(i / 5) + 1),
    numero: i + 1,
    titulo: `Capítulo ${i + 1}`,
    funcionDramatica: '',
    giroFuncional: '',
    cliffhanger: '',
    cambioProtagonista: '',
  })),
  semillas: [],
  antagonistaMomentos: [],
  lineasRojas: [],
  checklistRedaccion: [],
  configIA: {
    proveedor: 'openai',
    apiKey: '',
    modelo: 'gpt-4o',
    palabrasPorCapitulo: 2000,
    idioma: 'español',
    tonoNarrativo: 'literario',
  },
};
