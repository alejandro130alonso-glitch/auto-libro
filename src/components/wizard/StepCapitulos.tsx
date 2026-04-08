'use client';

import { useState } from 'react';
import { Capitulo, Acto } from '@/lib/types';

interface StepCapitulosProps {
  capitulos: Capitulo[];
  actos: Acto[];
  onChange: (capitulos: Capitulo[]) => void;
}

export default function StepCapitulos({ capitulos, actos, onChange }: StepCapitulosProps) {
  const [actoSeleccionado, setActoSeleccionado] = useState(actos[0]?.id ?? '1');
  const [capituloExpandido, setCapituloExpandido] = useState<string | null>(null);

  const capitulosActo = capitulos.filter(c => c.actoId === actoSeleccionado);

  const actualizar = (id: string, campo: keyof Capitulo, valor: string) => {
    onChange(capitulos.map(c => (c.id === id ? { ...c, [campo]: valor } : c)));
  };

  const agregarCapitulo = () => {
    const maxNumero = capitulos.reduce((max, c) => Math.max(max, c.numero), 0);
    const nuevo: Capitulo = {
      id: String(Date.now()),
      actoId: actoSeleccionado,
      numero: maxNumero + 1,
      titulo: `Capítulo ${maxNumero + 1}`,
      funcionDramatica: '',
      giroFuncional: '',
      cliffhanger: '',
      cambioProt: '',
    };
    onChange([...capitulos, nuevo]);
  };

  const eliminarCapitulo = (id: string) => {
    onChange(capitulos.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Capítulos</h2>
      <p className="text-gray-600 mb-4">
        Define la función dramática de cada capítulo. Selecciona un acto para ver sus capítulos.
      </p>

      {/* Selector de acto */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {actos.map(acto => (
          <button
            key={acto.id}
            onClick={() => setActoSeleccionado(acto.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              actoSeleccionado === acto.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {acto.titulo}
          </button>
        ))}
      </div>

      {/* Capítulos del acto seleccionado */}
      <div className="space-y-3">
        {capitulosActo.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No hay capítulos en este acto.</p>
        ) : (
          capitulosActo.map(cap => (
            <div key={cap.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setCapituloExpandido(capituloExpandido === cap.id ? null : cap.id)}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div>
                  <span className="text-xs text-indigo-500 font-semibold">CAP. {cap.numero}</span>
                  <p className="font-semibold text-gray-800">{cap.titulo}</p>
                </div>
                <span className="text-gray-400">{capituloExpandido === cap.id ? '▲' : '▼'}</span>
              </button>

              {capituloExpandido === cap.id && (
                <div className="p-4 space-y-3 bg-white">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                    <input
                      type="text"
                      value={cap.titulo}
                      onChange={e => actualizar(cap.id, 'titulo', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Función dramática
                    </label>
                    <textarea
                      value={cap.funcionDramatica}
                      onChange={e => actualizar(cap.id, 'funcionDramatica', e.target.value)}
                      placeholder="¿Qué debe conseguir este capítulo en la trama?"
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Giro funcional
                    </label>
                    <textarea
                      value={cap.giroFuncional}
                      onChange={e => actualizar(cap.id, 'giroFuncional', e.target.value)}
                      placeholder="El cambio o revelación que ocurre en este capítulo..."
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Cliffhanger / Cierre
                    </label>
                    <textarea
                      value={cap.cliffhanger}
                      onChange={e => actualizar(cap.id, 'cliffhanger', e.target.value)}
                      placeholder="¿Cómo termina el capítulo?"
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Cambio en el protagonista
                    </label>
                    <textarea
                      value={cap.cambioProt}
                      onChange={e => actualizar(cap.id, 'cambioProt', e.target.value)}
                      placeholder="¿Cómo cambia el protagonista después de este capítulo?"
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none"
                    />
                  </div>
                  <button
                    onClick={() => eliminarCapitulo(cap.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Eliminar capítulo
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button
        onClick={agregarCapitulo}
        className="mt-4 w-full border-2 border-dashed border-indigo-300 rounded-xl py-3 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
      >
        + Añadir capítulo al {actos.find(a => a.id === actoSeleccionado)?.titulo}
      </button>
    </div>
  );
}
