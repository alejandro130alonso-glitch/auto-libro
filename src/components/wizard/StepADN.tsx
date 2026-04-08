'use client';
import { ADNLibro } from '@/lib/types';

interface StepADNProps {
  data: ADNLibro;
  onChange: (data: ADNLibro) => void;
}

export default function StepADN({ data, onChange }: StepADNProps) {
  const fields = [
    { key: 'mundo', label: 'Mundo / Ambientación', placeholder: 'Describe el universo, época, lugar y reglas del mundo...', help: 'El escenario en el que transcurre la historia. Incluye época, lugar, características únicas del mundo.' },
    { key: 'motorLibro', label: 'Motor del Libro', placeholder: 'Qué elemento impulsa toda la trama...', help: 'El McGuffin, el conflicto central, la fuerza que pone en marcha la historia.' },
    { key: 'centroEmocional', label: 'Centro Emocional', placeholder: 'Qué conexión emocional ancla la historia al lector...', help: 'El corazón emocional de la historia. Qué siente el lector, con quién empatiza.' },
    { key: 'centroIdeologico', label: 'Centro Ideológico', placeholder: 'Qué defiende el antagonista y por qué tiene parte de razón...', help: 'La tesis del antagonista. Un buen antagonista tiene razón en algo fundamental.' },
    { key: 'finalObligatorio', label: 'Final Obligatorio', placeholder: 'Cómo debe terminar la historia de forma concreta...', help: 'La resolución concreta y definitiva. No un final vago, sino una decisión editorial firme.' },
  ] as const;

  return (
    <div className="space-y-6">
      {fields.map(({ key, label, placeholder, help }) => (
        <div key={key}>
          <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
          <p className="text-xs text-gray-500 mb-2">{help}</p>
          <textarea
            value={data[key]}
            onChange={e => onChange({ ...data, [key]: e.target.value })}
            placeholder={placeholder}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      ))}
    </div>
  );
}
