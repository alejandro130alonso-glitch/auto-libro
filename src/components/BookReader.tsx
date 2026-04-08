'use client';
import { useState } from 'react';
import { CapituloGenerado } from '@/lib/types';

interface BookReaderProps {
  capitulos: CapituloGenerado[];
}

export default function BookReader({ capitulos }: BookReaderProps) {
  const [capituloActual, setCapituloActual] = useState(0);

  if (capitulos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-xl">No hay capítulos generados todavía.</p>
        <p className="mt-2">Ve a la página de Generación para crear el libro.</p>
      </div>
    );
  }

  const capitulo = capitulos[capituloActual];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="md:w-64 flex-shrink-0">
        <div className="bg-gray-50 rounded-lg p-4 sticky top-4 max-h-screen overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">Capítulos</h3>
          <ul className="space-y-1">
            {capitulos.map((cap, idx) => (
              <li key={cap.numero}>
                <button
                  onClick={() => setCapituloActual(idx)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    idx === capituloActual
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cap.numero}. {cap.titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-lg shadow p-8 max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Capítulo {capitulo.numero}
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">{capitulo.titulo}</h2>
          <div className="prose prose-lg max-w-none">
            {capitulo.contenido.split('\n').filter(p => p.trim()).map((parrafo, i) => (
              <p key={i} className="text-gray-800 leading-relaxed mb-4 text-justify indent-8">
                {parrafo}
              </p>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCapituloActual(prev => Math.max(0, prev - 1))}
            disabled={capituloActual === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition-colors"
          >
            ← Anterior
          </button>
          <span className="text-gray-500 self-center text-sm">
            {capituloActual + 1} / {capitulos.length}
          </span>
          <button
            onClick={() => setCapituloActual(prev => Math.min(capitulos.length - 1, prev + 1))}
            disabled={capituloActual === capitulos.length - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
