'use client';

import { Personaje } from '@/lib/types';

interface StepPersonajesProps {
  personajes: Personaje[];
  onChange: (personajes: Personaje[]) => void;
}

const roles: Personaje['rol'][] = ['protagonista', 'antagonista', 'mentor', 'aliado', 'anclaEmocional', 'otro'];

const etiquetasRol: Record<Personaje['rol'], string> = {
  protagonista: 'Protagonista',
  antagonista: 'Antagonista',
  mentor: 'Mentor',
  aliado: 'Aliado',
  anclaEmocional: 'Ancla emocional',
  otro: 'Otro',
};

export default function StepPersonajes({ personajes, onChange }: StepPersonajesProps) {
  const actualizar = (id: string, campo: keyof Personaje, valor: string) => {
    onChange(personajes.map(p => (p.id === id ? { ...p, [campo]: valor } : p)));
  };

  const agregar = () => {
    const nuevo: Personaje = {
      id: String(Date.now()),
      nombre: '',
      rol: 'aliado',
      funcionArco: '',
      voz: '',
    };
    onChange([...personajes, nuevo]);
  };

  const eliminar = (id: string) => {
    onChange(personajes.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Personajes y Arcos</h2>
      <p className="text-gray-600 mb-6">
        Define los personajes principales y su función en la historia.
      </p>

      <div className="space-y-6">
        {personajes.map(p => (
          <div key={p.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={p.nombre}
                  onChange={e => actualizar(p.id, 'nombre', e.target.value)}
                  placeholder="Nombre del personaje"
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rol</label>
                <select
                  value={p.rol}
                  onChange={e => actualizar(p.id, 'rol', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                >
                  {roles.map(r => (
                    <option key={r} value={r}>{etiquetasRol[r]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Función en el arco narrativo
              </label>
              <textarea
                value={p.funcionArco}
                onChange={e => actualizar(p.id, 'funcionArco', e.target.value)}
                placeholder="¿Qué papel juega en el desarrollo de la trama?"
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Voz y personalidad
              </label>
              <textarea
                value={p.voz}
                onChange={e => actualizar(p.id, 'voz', e.target.value)}
                placeholder="¿Cómo habla? ¿Cómo piensa? Rasgos de personalidad..."
                rows={2}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
              />
            </div>
            {personajes.length > 1 && (
              <button
                onClick={() => eliminar(p.id)}
                className="text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                Eliminar personaje
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={agregar}
        className="mt-4 w-full border-2 border-dashed border-indigo-300 rounded-xl py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
      >
        + Añadir personaje
      </button>
    </div>
  );
}
