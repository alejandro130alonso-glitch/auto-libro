'use client';

import { MomentoAntagonista } from '@/lib/types';

interface StepAntagonistaProps {
  momentos: MomentoAntagonista[];
  onChange: (momentos: MomentoAntagonista[]) => void;
}

export default function StepAntagonista({ momentos, onChange }: StepAntagonistaProps) {
  const actualizar = (id: string, campo: keyof MomentoAntagonista, valor: string) => {
    onChange(momentos.map(m => (m.id === id ? { ...m, [campo]: valor } : m)));
  };

  const agregar = () => {
    const nuevo: MomentoAntagonista = {
      id: String(Date.now()),
      despuesDeCapitulo: '',
      respuestaObligatoria: '',
    };
    onChange([...momentos, nuevo]);
  };

  const eliminar = (id: string) => {
    onChange(momentos.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Aprendizaje Adaptativo del Antagonista</h2>
      <p className="text-gray-600 mb-6">
        Define cómo reacciona el antagonista a los fracasos del protagonista. Esto evita que el villano parezca estúpido.
      </p>

      {momentos.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No hay momentos de antagonista definidos.</p>
          <p className="text-sm mt-1">Define puntos donde el antagonista adapta su estrategia.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {momentos.map(m => (
            <div key={m.id} className="border border-red-200 rounded-xl p-4 bg-red-50">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Después del capítulo (número)
                </label>
                <input
                  type="text"
                  value={m.despuesDeCapitulo}
                  onChange={e => actualizar(m.id, 'despuesDeCapitulo', e.target.value)}
                  placeholder="Ej: 10"
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Respuesta obligatoria del antagonista
                </label>
                <textarea
                  value={m.respuestaObligatoria}
                  onChange={e => actualizar(m.id, 'respuestaObligatoria', e.target.value)}
                  placeholder="¿Qué hace el antagonista para adaptar su estrategia?"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                />
              </div>
              <button
                onClick={() => eliminar(m.id)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Eliminar momento
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={agregar}
        className="mt-4 w-full border-2 border-dashed border-red-300 rounded-xl py-3 text-red-700 font-semibold hover:bg-red-50 transition-colors"
      >
        + Añadir momento del antagonista
      </button>
    </div>
  );
}
