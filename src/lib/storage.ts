import { Escaleta, EstadoGeneracion, WizardState } from './types';

const KEYS = {
  WIZARD: 'auto-libro-wizard',
  ESCALETA: 'auto-libro-escaleta',
  GENERACION: 'auto-libro-generacion',
};

export function guardarWizard(state: WizardState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.WIZARD, JSON.stringify(state));
}

export function cargarWizard(): WizardState | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(KEYS.WIZARD);
  return data ? JSON.parse(data) : null;
}

export function guardarEscaleta(escaleta: Escaleta): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.ESCALETA, JSON.stringify(escaleta));
}

export function cargarEscaleta(): Escaleta | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(KEYS.ESCALETA);
  return data ? JSON.parse(data) : null;
}

export function guardarGeneracion(estado: EstadoGeneracion): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.GENERACION, JSON.stringify(estado));
}

export function cargarGeneracion(): EstadoGeneracion | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(KEYS.GENERACION);
  return data ? JSON.parse(data) : null;
}

export function limpiarTodo(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}

export function escaletaVacia(): Escaleta {
  return {
    adn: {
      mundo: '',
      motor: '',
      centroEmocional: '',
      centroIdeologico: '',
      finalObligatorio: '',
    },
    personajes: [
      { id: '1', nombre: '', rol: 'protagonista', funcionArco: '', voz: '' },
      { id: '2', nombre: '', rol: 'antagonista', funcionArco: '', voz: '' },
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
      actoId: String(Math.ceil((i + 1) / 5)),
      numero: i + 1,
      titulo: `Capítulo ${i + 1}`,
      funcionDramatica: '',
      giroFuncional: '',
      cliffhanger: '',
      cambioProt: '',
    })),
    semillas: [],
    momentosAntagonista: [],
    lineasRojas: [],
    checklistRedaccion: [],
    configIA: {
      proveedor: 'openai',
      apiKey: '',
      modelo: 'gpt-4o',
      longitudPalabras: 3000,
      idioma: 'español',
      tonoNarrativo: 'literario',
    },
  };
}
