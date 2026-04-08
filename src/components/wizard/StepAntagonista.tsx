'use client';
import { AntagonistaMomento } from '@/lib/types';

interface StepAntagonistaProps {
  data: AntagonistaMomento[];
  onChange: (data: AntagonistaMomento[]) => void;
}

export default function StepAntagonista({ data, onChange }: StepAntagonistaProps) {
  const addMomento = () => {
    onChange([...data, { id: Date.now().toString(), despuesDeCapitulo: '', respuestaObligatoria: '' }]);
  };

  const removeMomento = (id: string) => {
    onChange(data.filter(m => m.id !== id));
  };

  const updateMomento = (id: string, updates: Partial<AntagonistaMomento>) => {
    onChange(data.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 bg-red-50 border border-red-200 rounded p-3">
        Define los momentos en que el antagonista o sistema enemigo aprende y adapta su estrategia. Cada intrusión debe tener consecuencias.
      </p>

      {data.map((momento, idx) => (
        <div key={momento.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Momento {idx + 1}</h3>
            <button onClick={() => removeMomento(momento.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Después del capítulo</label>
              <input
                type="text"
                value={momento.despuesDeCapitulo}
                onChange={e => updateMomento(momento.id, { despuesDeCapitulo: e.target.value })}
                placeholder="3-4"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">Respuesta obligatoria del antagonista</label>
              <textarea
                value={momento.respuestaObligatoria}
                onChange={e => updateMomento(momento.id, { respuestaObligatoria: e.target.value })}
                placeholder="Qué hace el enemigo para adaptarse..."
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addMomento}
        className="w-full border-2 border-dashed border-red-300 text-red-600 rounded-lg py-3 hover:bg-red-50 transition-colors text-sm font-medium"
      >
        + Añadir momento de adaptación
      </button>
    </div>
  );
}
