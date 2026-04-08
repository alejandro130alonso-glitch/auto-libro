'use client';

interface StepLineasRojasProps {
  lineasRojas: string[];
  checklist: string[];
  onChangeLineas: (data: string[]) => void;
  onChangeChecklist: (data: string[]) => void;
}

function ListEditor({ items, onChange, placeholder, addLabel }: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  const addItem = () => onChange([...items, '']);
  const removeItem = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const updateItem = (idx: number, value: string) => onChange(items.map((item, i) => i === idx ? value : item));

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={e => updateItem(idx, e.target.value)}
            placeholder={placeholder}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700 px-2">✕</button>
        </div>
      ))}
      <button
        onClick={addItem}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        {addLabel}
      </button>
    </div>
  );
}

export default function StepLineasRojas({ lineasRojas, checklist, onChangeLineas, onChangeChecklist }: StepLineasRojasProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">🚫 Líneas Rojas de Continuidad</h3>
        <p className="text-sm text-gray-500 mb-4">Cosas que NUNCA deben pasar en la novela. Restricciones absolutas.</p>
        <ListEditor
          items={lineasRojas}
          onChange={onChangeLineas}
          placeholder="Escribir la línea roja..."
          addLabel="+ Añadir línea roja"
        />
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-2">✅ Checklist de Redacción</h3>
        <p className="text-sm text-gray-500 mb-4">Reglas que cada capítulo debe cumplir obligatoriamente.</p>
        <ListEditor
          items={checklist}
          onChange={onChangeChecklist}
          placeholder="Escribir la regla de redacción..."
          addLabel="+ Añadir regla"
        />
      </div>
    </div>
  );
}
