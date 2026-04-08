'use client';

interface ProgressBarProps {
  pasoActual: number;
  totalPasos: number;
  etiquetas?: string[];
}

export default function ProgressBar({ pasoActual, totalPasos, etiquetas }: ProgressBarProps) {
  const porcentaje = Math.round((pasoActual / totalPasos) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Paso {pasoActual} de {totalPasos}</span>
        <span>{porcentaje}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${porcentaje}%` }}
        />
      </div>
      {etiquetas && (
        <div className="flex justify-between mt-2">
          {etiquetas.map((etiqueta, i) => (
            <span
              key={i}
              className={`text-xs text-center flex-1 ${
                i + 1 === pasoActual ? 'text-indigo-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {etiqueta}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
