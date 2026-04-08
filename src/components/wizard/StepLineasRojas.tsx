'use client';

interface StepLineasRojasProps {
  lineasRojas: string[];
  checklistRedaccion: string[];
  onChange: (lineasRojas: string[], checklistRedaccion: string[]) => void;
}

function ListaEditable({
  items,
  onChange,
  placeholder,
  titulo,
  color,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  titulo: string;
  color: 'red' | 'green';
}) {
  const colorMap = {
    red: {
      border: 'border-red-200',
      bg: 'bg-red-50',
      btn: 'border-red-300 text-red-700 hover:bg-red-50',
      title: 'text-red-800',
    },
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      btn: 'border-green-300 text-green-700 hover:bg-green-50',
      title: 'text-green-800',
    },
  }[color];

  const actualizar = (idx: number, valor: string) => {
    const nuevos = [...items];
    nuevos[idx] = valor;
    onChange(nuevos);
  };

  const agregar = () => onChange([...items, '']);
  const eliminar = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  return (
    <div className={`border ${colorMap.border} rounded-xl p-4 ${colorMap.bg}`}>
      <h3 className={`font-bold ${colorMap.title} mb-3`}>{titulo}</h3>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => actualizar(idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm"
            />
            <button
              onClick={() => eliminar(idx)}
              className="px-3 py-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={agregar}
        className={`mt-3 w-full border-2 border-dashed ${colorMap.btn} rounded-lg py-2 font-semibold text-sm transition-colors`}
      >
        + Añadir
      </button>
    </div>
  );
}

export default function StepLineasRojas({ lineasRojas, checklistRedaccion, onChange }: StepLineasRojasProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Líneas Rojas y Checklist</h2>
      <p className="text-gray-600 mb-6">
        Define qué nunca debe hacer la IA y qué siempre debe cumplir al escribir.
      </p>

      <div className="space-y-6">
        <ListaEditable
          items={lineasRojas}
          onChange={nuevas => onChange(nuevas, checklistRedaccion)}
          placeholder="Ej: Nunca matar a un personaje secundario sin motivo narrativo..."
          titulo="🚫 Líneas Rojas (nunca hacer esto)"
          color="red"
        />

        <ListaEditable
          items={checklistRedaccion}
          onChange={nuevos => onChange(lineasRojas, nuevos)}
          placeholder="Ej: Siempre incluir al menos un diálogo significativo..."
          titulo="✅ Checklist de Redacción (siempre cumplir)"
          color="green"
        />
      </div>
    </div>
  );
}
