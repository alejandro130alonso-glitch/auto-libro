'use client';
import { Semilla } from '@/lib/types';

interface StepSemillasProps {
  data: Semilla[];
  onChange: (data: Semilla[]) => void;
}

export default function StepSemillas({ data, onChange }: StepSemillasProps) {
  const addSemilla = () => {
    onChange([...data, { id: Date.now().toString(), elemento: '', siembra: '', cobro: '', nota: '' }]);
  };

  const removeSemilla = (id: string) => {
    onChange(data.filter(s => s.id !== id));
  };

  const updateSemilla = (id: string, updates: Partial<Semilla>) => {
    onChange(data.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded p-3">
        Las semillas son elementos narrativos que se plantan en un capítulo y se cobran (tienen consecuencias) en otro. Son cruciales para la coherencia narrativa.
      </p>

      {data.map((semilla, idx) => (
        <div key={semilla.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Semilla {idx + 1}</h3>
            <button onClick={() => removeSemilla(semilla.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Elemento (nombre del recurso narrativo)</label>
              <input
                type="text"
                value={semilla.elemento}
                onChange={e => updateSemilla(semilla.id, { elemento: e.target.value })}
                placeholder="ADN del contenedor, el medallón, la clave..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Siembra (capítulo/s)</label>
              <input
                type="text"
                value={semilla.siembra}
                onChange={e => updateSemilla(semilla.id, { siembra: e.target.value })}
                placeholder="1, 3-4, 6..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cobro (capítulo/s)</label>
              <input
                type="text"
                value={semilla.cobro}
                onChange={e => updateSemilla(semilla.id, { cobro: e.target.value })}
                placeholder="15, 28..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nota de uso</label>
              <input
                type="text"
                value={semilla.nota}
                onChange={e => updateSemilla(semilla.id, { nota: e.target.value })}
                placeholder="Restricción de uso, instrucción especial..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addSemilla}
        className="w-full border-2 border-dashed border-yellow-400 text-yellow-600 rounded-lg py-3 hover:bg-yellow-50 transition-colors text-sm font-medium"
      >
        + Añadir semilla
      </button>
    </div>
  );
}
