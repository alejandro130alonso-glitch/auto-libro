'use client';

import { useEffect, useState } from 'react';
import { cargarEscaleta, cargarGeneracion } from '@/lib/storage';
import { Escaleta, Capitulo } from '@/lib/types';
import { exportarEscaleta, exportarLibro } from '@/lib/docx-generator';
import Link from 'next/link';

export default function ExportPage() {
  const [escaleta, setEscaleta] = useState<Escaleta | null>(null);
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [exportandoLibro, setExportandoLibro] = useState(false);
  const [exportandoEscaleta, setExportandoEscaleta] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const esc = cargarEscaleta();
    const gen = cargarGeneracion();
    setEscaleta(esc);
    if (gen) setCapitulos(gen.capitulos);
    setCargado(true);
  }, []);

  const handleExportarLibro = async () => {
    if (!escaleta) return;
    setExportandoLibro(true);
    try {
      await exportarLibro(escaleta, capitulos);
    } finally {
      setExportandoLibro(false);
    }
  };

  const handleExportarEscaleta = async () => {
    if (!escaleta) return;
    setExportandoEscaleta(true);
    try {
      await exportarEscaleta(escaleta);
    } finally {
      setExportandoEscaleta(false);
    }
  };

  if (!cargado) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const capitulosConContenido = capitulos.filter(c => c.contenido);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-900 mb-8">Exportar</h1>

      <div className="space-y-6">
        {/* Exportar libro */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📖</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Exportar Libro (DOCX)</h2>
              <p className="text-gray-500 text-sm mb-3">
                Descarga el libro completo con todos los capítulos generados en formato Word.
              </p>
              {capitulosConContenido.length === 0 ? (
                <div className="text-sm text-orange-600 mb-3">
                  ⚠️ No hay capítulos generados.{' '}
                  <Link href="/generate" className="underline">Genera el libro primero.</Link>
                </div>
              ) : (
                <p className="text-sm text-green-600 mb-3">
                  ✅ {capitulosConContenido.length} capítulos listos para exportar.
                </p>
              )}
              <button
                onClick={handleExportarLibro}
                disabled={!escaleta || capitulosConContenido.length === 0 || exportandoLibro}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-40 transition-colors"
              >
                {exportandoLibro ? 'Generando DOCX…' : '⬇ Descargar libro.docx'}
              </button>
            </div>
          </div>
        </div>

        {/* Exportar escaleta */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📋</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Exportar Escaleta (DOCX)</h2>
              <p className="text-gray-500 text-sm mb-3">
                Descarga la escaleta completa del libro con personajes, actos, capítulos y semillas.
              </p>
              {!escaleta ? (
                <div className="text-sm text-orange-600 mb-3">
                  ⚠️ No hay escaleta guardada.{' '}
                  <Link href="/wizard" className="underline">Crea una escaleta primero.</Link>
                </div>
              ) : (
                <p className="text-sm text-green-600 mb-3">
                  ✅ Escaleta lista para exportar.
                </p>
              )}
              <button
                onClick={handleExportarEscaleta}
                disabled={!escaleta || exportandoEscaleta}
                className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-40 transition-colors"
              >
                {exportandoEscaleta ? 'Generando DOCX…' : '⬇ Descargar escaleta.docx'}
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <strong>Nota:</strong> Los archivos DOCX se generan completamente en tu navegador y se descargan directamente a tu dispositivo. No se envía ningún dato a nuestros servidores.
        </div>
      </div>
    </div>
  );
}
