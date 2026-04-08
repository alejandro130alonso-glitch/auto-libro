'use client';
import { Personaje } from '@/lib/types';

interface StepPersonajesProps {
  data: Personaje[];
  onChange: (data: Personaje[]) => void;
}

const FUNCIONES = ['protagonista', 'antagonista', 'mentor', 'aliado', 'ancla emocional', 'secundario'];

export default function StepPersonajes({ data, onChange }: StepPersonajesProps) {
  const addPersonaje = () => {
    const nuevo: Personaje = {
      id: Date.now().toString(),
      nombre: '',
      funcionNarrativa: 'aliado',
      arco: '',
      voz: '',
    };
    onChange([...data, nuevo]);
  };

  const removePersonaje = (id: string) => {
    if (data.length <= 2) return;
    onChange(data.filter(p => p.id !== id));
  };

  const updatePersonaje = (id: string, updates: Partial<Personaje>) => {
    onChange(data.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="space-y-6">
      {data.map((personaje, idx) => (
        <div key={personaje.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Personaje {idx + 1}</h3>
            {data.length > 2 && (
              <button
                onClick={() => removePersonaje(personaje.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Eliminar
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
              <input
                type="text"
                value={personaje.nombre}
                onChange={e => updatePersonaje(personaje.id, { nombre: e.target.value })}
                placeholder="Nombre del personaje"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Función Narrativa</label>
              <select
                value={personaje.funcionNarrativa}
                onChange={e => updatePersonaje(personaje.id, { funcionNarrativa: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {FUNCIONES.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Arco del Personaje</label>
              <textarea
                value={personaje.arco}
                onChange={e => updatePersonaje(personaje.id, { arco: e.target.value })}
                placeholder="De dónde parte → A dónde llega. Cuál es su cambio clave."
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Voz del Personaje</label>
              <textarea
                value={personaje.voz}
                onChange={e => updatePersonaje(personaje.id, { voz: e.target.value })}
                placeholder="Cómo habla, qué tipo de lenguaje usa, qué verbos prioriza..."
                rows={2}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addPersonaje}
        className="w-full border-2 border-dashed border-blue-300 text-blue-600 rounded-lg py-3 hover:bg-blue-50 transition-colors text-sm font-medium"
      >
        + Añadir personaje
      </button>
    </div>
  );
}
