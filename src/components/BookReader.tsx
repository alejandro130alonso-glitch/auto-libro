'use client';

import { useState } from 'react';
import { Capitulo } from '@/lib/types';

interface BookReaderProps {
  capitulos: Capitulo[];
}

export default function BookReader({ capitulos }: BookReaderProps) {
  const capitulosConContenido = capitulos.filter(c => c.contenido);
  const [capituloSeleccionado, setCapituloSeleccionado] = useState(
    capitulosConContenido[0]?.numero ?? 1
  );

  const capitulo = capitulosConContenido.find(c => c.numero === capituloSeleccionado);

  if (capitulosConContenido.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No hay capítulos generados todavía.</p>
        <p className="mt-2">Ve a la página de Generar para crear el contenido del libro.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 max-w-7xl mx-auto">
      {/* Sidebar de capítulos */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow p-4 sticky top-4">
          <h2 className="font-bold text-gray-700 mb-3">Capítulos</h2>
          <nav className="space-y-1 max-h-screen overflow-y-auto">
            {capitulosConContenido.map(c => (
              <button
                key={c.numero}
                onClick={() => setCapituloSeleccionado(c.numero)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  c.numero === capituloSeleccionado
                    ? 'bg-indigo-100 text-indigo-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="block text-xs text-gray-400">Cap. {c.numero}</span>
                {c.titulo}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Contenido del capítulo */}
      <main className="flex-1 min-w-0">
        {capitulo ? (
          <article className="bg-white rounded-xl shadow p-8">
            <div className="text-center mb-8">
              <p className="text-sm text-indigo-500 uppercase tracking-widest mb-2">
                Capítulo {capitulo.numero}
              </p>
              <h1 className="text-3xl font-bold text-gray-900">{capitulo.titulo}</h1>
            </div>
            <div className="prose prose-lg max-w-none">
              {capitulo.contenido!.split('\n').filter(p => p.trim()).map((p, i) => (
                <p key={i} className="mb-4 text-gray-800 leading-relaxed text-lg">
                  {p.trim()}
                </p>
              ))}
            </div>
            <div className="mt-8 flex justify-between border-t pt-4">
              <button
                onClick={() => {
                  const idx = capitulosConContenido.findIndex(c => c.numero === capituloSeleccionado);
                  if (idx > 0) setCapituloSeleccionado(capitulosConContenido[idx - 1].numero);
                }}
                disabled={capitulosConContenido[0]?.numero === capituloSeleccionado}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-40 hover:bg-gray-200 transition-colors"
              >
                ← Anterior
              </button>
              <button
                onClick={() => {
                  const idx = capitulosConContenido.findIndex(c => c.numero === capituloSeleccionado);
                  if (idx < capitulosConContenido.length - 1)
                    setCapituloSeleccionado(capitulosConContenido[idx + 1].numero);
                }}
                disabled={capitulosConContenido[capitulosConContenido.length - 1]?.numero === capituloSeleccionado}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-40 hover:bg-indigo-700 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          </article>
        ) : (
          <div className="text-center py-12 text-gray-400">Selecciona un capítulo</div>
        )}
      </main>
    </div>
  );
}
