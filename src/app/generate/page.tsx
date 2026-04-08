'use client';

import { useEffect, useState } from 'react';
import { cargarEscaleta } from '@/lib/storage';
import { Escaleta } from '@/lib/types';
import { useBookGeneration } from '@/hooks/useBookGeneration';
import Link from 'next/link';

function GenerationContent({ escaleta }: { escaleta: Escaleta }) {
  const { estado, generando, generarLibro, pausar, reanudar, reiniciar } = useBookGeneration(escaleta);

  const porcentaje = estado.totalCapitulos > 0
    ? Math.round((estado.capituloActual / estado.totalCapitulos) * 100)
    : 0;

  const capitulosGenerados = estado.capitulos.filter(c => c.contenido).length;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">Generar Libro</h1>

      {/* Estado de progreso */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-gray-800">Progreso de generación</h2>
          <span className="text-sm text-gray-500">
            {capitulosGenerados} / {estado.totalCapitulos} capítulos
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
          <div
            className="bg-indigo-600 h-4 rounded-full transition-all duration-700"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">{porcentaje}% completado</p>

        {estado.error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm font-semibold">Error:</p>
            <p className="text-red-600 text-sm">{estado.error}</p>
          </div>
        )}

        {estado.completado && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-semibold">✅ ¡Libro generado con éxito!</p>
          </div>
        )}
      </div>

      {/* Lista de capítulos */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="font-bold text-gray-800 mb-4">Capítulos</h2>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {estado.capitulos.map(cap => (
            <div
              key={cap.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                cap.numero === estado.capituloActual && generando
                  ? 'bg-indigo-50 border border-indigo-200'
                  : ''
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  cap.contenido
                    ? 'bg-green-100 text-green-700'
                    : cap.numero === estado.capituloActual && generando
                    ? 'bg-indigo-100 text-indigo-700 animate-pulse'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {cap.contenido ? '✓' : cap.numero === estado.capituloActual && generando ? '…' : cap.numero}
              </span>
              <span className={`text-sm ${cap.contenido ? 'text-gray-900' : 'text-gray-400'}`}>
                {cap.titulo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-wrap gap-3">
        {!generando && !estado.completado && (
          <button
            onClick={() => {
              const primerSinContenido = estado.capitulos.find(c => !c.contenido);
              generarLibro(primerSinContenido?.numero ?? 1);
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            {capitulosGenerados > 0 ? '▶ Reanudar' : '🚀 Comenzar generación'}
          </button>
        )}

        {generando && (
          <button
            onClick={pausar}
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors"
          >
            ⏸ Pausar
          </button>
        )}

        {estado.pausado && !generando && (
          <button
            onClick={reanudar}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            ▶ Continuar
          </button>
        )}

        <button
          onClick={reiniciar}
          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          🔄 Reiniciar
        </button>

        {capitulosGenerados > 0 && (
          <Link
            href="/book"
            className="px-4 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            📖 Leer libro
          </Link>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-400 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <strong>Nota:</strong> No cierres esta pestaña durante la generación. El progreso se guarda automáticamente tras cada capítulo.
      </div>
    </div>
  );
}

export default function GeneratePage() {
  const [escaleta, setEscaleta] = useState<Escaleta | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const data = cargarEscaleta();
    setEscaleta(data);
    setCargado(true);
  }, []);

  if (!cargado) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (!escaleta) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">No hay escaleta guardada</h2>
        <p className="text-gray-500 mb-6">
          Necesitas completar la escaleta antes de generar el libro.
        </p>
        <Link
          href="/wizard"
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Crear escaleta
        </Link>
      </div>
    );
  }

  return <GenerationContent escaleta={escaleta} />;
}
