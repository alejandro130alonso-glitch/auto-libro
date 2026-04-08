'use client';

import { Acto } from '@/lib/types';

interface StepActosProps {
  actos: Acto[];
  onChange: (actos: Acto[]) => void;
}

export default function StepActos({ actos, onChange }: StepActosProps) {
  const actualizar = (id: string, campo: keyof Acto, valor: string) => {
    onChange(actos.map(a => (a.id === id ? { ...a, [campo]: valor } : a)));
  };

  const agregar = () => {
    const nuevo: Acto = {
      id: String(Date.now()),
      titulo: `Acto ${actos.length + 1}`,
      tono: '',
      funcionNarrativa: '',
      notaEditorial: '',
    };
    onChange([...actos, nuevo]);
  };

  const eliminar = (id: string) => {
    if (actos.length <= 1) return;
    onChange(actos.filter(a => a.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Estructura de Actos</h2>
      <p className="text-gray-600 mb-6">
        Define la estructura en actos de tu libro. Cada acto agrupa capítulos con una función narrativa.
      </p>

      <div className="space-y-5">
        {actos.map((acto, idx) => (
          <div key={acto.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-gray-800">Acto {idx + 1}</h3>
              {actos.length > 1 && (
                <button
                  onClick={() => eliminar(acto.id)}
                  className="text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  Eliminar
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={acto.titulo}
                  onChange={e => actualizar(acto.id, 'titulo', e.target.value)}
                  placeholder={`Acto ${idx + 1}`}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tono</label>
                <input
                  type="text"
                  value={acto.tono}
                  onChange={e => actualizar(acto.id, 'tono', e.target.value)}
                  placeholder="Oscuro, esperanzador, tenso..."
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Función narrativa</label>
              <textarea
                value={acto.funcionNarrativa}
                onChange={e => actualizar(acto.id, 'funcionNarrativa', e.target.value)}
                placeholder="¿Qué debe conseguir este bloque de la historia?"
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nota editorial</label>
              <textarea
                value={acto.notaEditorial}
                onChange={e => actualizar(acto.id, 'notaEditorial', e.target.value)}
                placeholder="Notas adicionales para el escritor AI..."
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={agregar}
        className="mt-4 w-full border-2 border-dashed border-indigo-300 rounded-xl py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
      >
        + Añadir acto
      </button>
    </div>
  );
}
