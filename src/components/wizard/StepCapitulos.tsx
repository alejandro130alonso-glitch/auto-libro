'use client';
import { Capitulo, Acto } from '@/lib/types';

interface StepCapitulosProps {
  data: Capitulo[];
  actos: Acto[];
  onChange: (data: Capitulo[]) => void;
}

export default function StepCapitulos({ data, actos, onChange }: StepCapitulosProps) {
  const updateCapitulo = (id: string, updates: Partial<Capitulo>) => {
    onChange(data.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const changeNumCapitulos = (num: number) => {
    if (num < 1 || num > 100) return;
    if (num > data.length) {
      const extras = Array.from({ length: num - data.length }, (_, i) => ({
        id: String(data.length + i + 1),
        actoId: actos[actos.length - 1]?.id || '1',
        numero: data.length + i + 1,
        titulo: `Capítulo ${data.length + i + 1}`,
        funcionDramatica: '',
        giroFuncional: '',
        cliffhanger: '',
        cambioProtagonista: '',
      }));
      onChange([...data, ...extras]);
    } else {
      onChange(data.slice(0, num).map((c, i) => ({ ...c, numero: i + 1 })));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <label className="font-semibold text-gray-700">Número de Capítulos:</label>
        <input
          type="number"
          min={1}
          max={100}
          value={data.length}
          onChange={e => changeNumCapitulos(parseInt(e.target.value))}
          className="w-20 border border-gray-300 rounded px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {data.map((capitulo) => (
          <div key={capitulo.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Cap. {capitulo.numero}
              </span>
              <input
                type="text"
                value={capitulo.titulo}
                onChange={e => updateCapitulo(capitulo.id, { titulo: e.target.value })}
                placeholder="Título del capítulo"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={capitulo.actoId}
                onChange={e => updateCapitulo(capitulo.id, { actoId: e.target.value })}
                className="border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {actos.map(a => (
                  <option key={a.id} value={a.id}>{a.titulo}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'funcionDramatica', label: 'Función Dramática', placeholder: 'Qué debe lograr este capítulo...' },
                { key: 'giroFuncional', label: 'Giro Funcional', placeholder: 'Qué evento cambia la situación...' },
                { key: 'cliffhanger', label: 'Cliffhanger o Cierre', placeholder: 'Cómo termina el capítulo...' },
                { key: 'cambioProtagonista', label: 'Cambio en el Protagonista', placeholder: 'Cómo evoluciona el protagonista...' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                  <textarea
                    value={capitulo[key as keyof Capitulo] as string}
                    onChange={e => updateCapitulo(capitulo.id, { [key]: e.target.value })}
                    placeholder={placeholder}
                    rows={2}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
