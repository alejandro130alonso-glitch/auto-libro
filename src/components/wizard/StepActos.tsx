'use client';
import { Acto } from '@/lib/types';

interface StepActosProps {
  data: Acto[];
  onChange: (data: Acto[]) => void;
}

export default function StepActos({ data, onChange }: StepActosProps) {
  const updateActo = (id: string, updates: Partial<Acto>) => {
    onChange(data.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const changeNumActos = (num: number) => {
    if (num < 1 || num > 12) return;
    if (num > data.length) {
      const extras = Array.from({ length: num - data.length }, (_, i) => ({
        id: String(data.length + i + 1),
        titulo: `Acto ${data.length + i + 1}`,
        tono: '',
        funcionNarrativa: '',
        notaEditorial: '',
      }));
      onChange([...data, ...extras]);
    } else {
      onChange(data.slice(0, num));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-semibold text-gray-700">Número de Actos:</label>
        <input
          type="number"
          min={1}
          max={12}
          value={data.length}
          onChange={e => changeNumActos(parseInt(e.target.value))}
          className="w-20 border border-gray-300 rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {data.map((acto, idx) => (
        <div key={acto.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-3">Acto {idx + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Título del Acto</label>
              <input
                type="text"
                value={acto.titulo}
                onChange={e => updateActo(acto.id, { titulo: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tono General</label>
              <input
                type="text"
                value={acto.tono}
                onChange={e => updateActo(acto.id, { tono: e.target.value })}
                placeholder="robo, tensión, guerra, cuenta atrás..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Función Narrativa del Acto</label>
              <textarea
                value={acto.funcionNarrativa}
                onChange={e => updateActo(acto.id, { funcionNarrativa: e.target.value })}
                placeholder="Qué debe lograr este bloque..."
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nota Editorial</label>
              <textarea
                value={acto.notaEditorial}
                onChange={e => updateActo(acto.id, { notaEditorial: e.target.value })}
                placeholder="Qué NO hacer en este acto, líneas rojas del acto..."
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
