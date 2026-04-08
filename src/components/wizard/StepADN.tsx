'use client';

import { ADNLibro } from '@/lib/types';

interface StepADNProps {
  adn: ADNLibro;
  onChange: (adn: ADNLibro) => void;
}

const campos: { key: keyof ADNLibro; label: string; placeholder: string }[] = [
  {
    key: 'mundo',
    label: 'Mundo del libro',
    placeholder: 'Describe el universo, tiempo, lugar y contexto donde sucede la historia...',
  },
  {
    key: 'motor',
    label: 'Motor del libro',
    placeholder: '¿Qué impulsa la historia hacia adelante? La pregunta central que el lector necesita responder...',
  },
  {
    key: 'centroEmocional',
    label: 'Centro emocional',
    placeholder: 'El tema emocional profundo del libro. Lo que le hará sentir al lector...',
  },
  {
    key: 'centroIdeologico',
    label: 'Centro ideológico',
    placeholder: 'La tesis o idea que el libro defiende. Lo que el lector aprenderá sobre el mundo...',
  },
  {
    key: 'finalObligatorio',
    label: 'Final obligatorio',
    placeholder: 'La resolución que la historia exige. Puede ser abierto, cerrado, trágico o esperanzador...',
  },
];

export default function StepADN({ adn, onChange }: StepADNProps) {
  const handleChange = (key: keyof ADNLibro, value: string) => {
    onChange({ ...adn, [key]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">ADN del Libro</h2>
      <p className="text-gray-600 mb-6">
        Define la esencia de tu libro. Estos elementos guiarán toda la generación.
      </p>
      <div className="space-y-6">
        {campos.map(campo => (
          <div key={campo.key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {campo.label}
            </label>
            <textarea
              value={adn[campo.key]}
              onChange={e => handleChange(campo.key, e.target.value)}
              placeholder={campo.placeholder}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
