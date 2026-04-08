'use client';

import { Semilla } from '@/lib/types';

interface StepSemillasProps {
  semillas: Semilla[];
  onChange: (semillas: Semilla[]) => void;
}

export default function StepSemillas({ semillas, onChange }: StepSemillasProps) {
  const actualizar = (id: string, campo: keyof Semilla, valor: string) => {
    onChange(semillas.map(s => (s.id === id ? { ...s, [campo]: valor } : s)));
  };

  const agregar = () => {
    const nuevo: Semilla = {
      id: String(Date.now()),
      elemento: '',
      siembra: '',
      cobro: '',
      nota: '',
    };
    onChange([...semillas, nuevo]);
  };

  const eliminar = (id: string) => {
    onChange(semillas.filter(s => s.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Semillas y Payoffs</h2>
      <p className="text-gray-600 mb-6">
        Define los elementos que se siembran al inicio y se cobran más tarde. Esto crea coherencia narrativa.
      </p>

      {semillas.length === 0 ? (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <p>No hay semillas definidas.</p>
          <p className="text-sm mt-1">Añade elementos que quieras plantar y cobrar en la historia.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {semillas.map(s => (
            <div key={s.id} className="border border-yellow-200 rounded-xl p-4 bg-yellow-50">
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Elemento / Objeto / Información
                </label>
                <input
                  type="text"
                  value={s.elemento}
                  onChange={e => actualizar(s.id, 'elemento', e.target.value)}
                  placeholder="Ej: La llave del cajón, El secreto de la madre..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Se siembra en (capítulos)
                  </label>
                  <input
                    type="text"
                    value={s.siembra}
                    onChange={e => actualizar(s.id, 'siembra', e.target.value)}
                    placeholder="Ej: 3, 7"
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Se cobra en (capítulos)
                  </label>
                  <input
                    type="text"
                    value={s.cobro}
                    onChange={e => actualizar(s.id, 'cobro', e.target.value)}
                    placeholder="Ej: 25, 28"
                    className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nota para el escritor AI
                </label>
                <textarea
                  value={s.nota}
                  onChange={e => actualizar(s.id, 'nota', e.target.value)}
                  placeholder="Instrucciones específicas sobre cómo tratar este elemento..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                />
              </div>
              <button
                onClick={() => eliminar(s.id)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Eliminar semilla
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={agregar}
        className="mt-4 w-full border-2 border-dashed border-yellow-300 rounded-xl py-3 text-yellow-700 font-semibold hover:bg-yellow-50 transition-colors"
      >
        + Añadir semilla
      </button>
    </div>
  );
}
