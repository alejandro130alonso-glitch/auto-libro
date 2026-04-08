'use client';
import { useState } from 'react';
import { useWizardState } from '@/hooks/useWizardState';
import { useBookGeneration } from '@/hooks/useBookGeneration';
import { generateBookDocx, generateEscaletaDocx } from '@/lib/docx-generator';
import { saveAs } from 'file-saver';

export default function ExportPage() {
  const { escaleta } = useWizardState();
  const { estado } = useBookGeneration();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExportLibro = async () => {
    if (estado.capitulos.length === 0) {
      setError('No hay capítulos generados. Ve a Generar primero.');
      return;
    }
    setLoading('libro');
    setError(null);
    try {
      const blob = await generateBookDocx(escaleta, estado.capitulos, 'Mi Libro');
      saveAs(blob, 'libro.docx');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al exportar');
    } finally {
      setLoading(null);
    }
  };

  const handleExportEscaleta = async () => {
    setLoading('escaleta');
    setError(null);
    try {
      const blob = await generateEscaletaDocx(escaleta);
      saveAs(blob, 'escaleta.docx');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al exportar');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">📥 Exportar</h1>
      <p className="text-gray-500 mb-8">Descarga tu libro y escaleta en formato Word</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
          ❌ {error}
        </div>
      )}

      <div className="grid gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">📚 Libro Completo</h2>
          <p className="text-gray-600 text-sm mb-4">
            Exporta el libro completo con todos los capítulos generados en formato DOCX con estructura profesional (título, índice, capítulos).
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Capítulos disponibles: <strong>{estado.capitulos.length}</strong>
          </p>
          <button
            onClick={handleExportLibro}
            disabled={loading !== null || estado.capitulos.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors font-medium"
          >
            {loading === 'libro' ? '⏳ Generando...' : '⬇️ Descargar libro.docx'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">📋 Escaleta</h2>
          <p className="text-gray-600 text-sm mb-4">
            Exporta la escaleta completa con toda la estructura narrativa: ADN, personajes, actos, capítulos, semillas y líneas rojas.
          </p>
          <button
            onClick={handleExportEscaleta}
            disabled={loading !== null}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-40 transition-colors font-medium"
          >
            {loading === 'escaleta' ? '⏳ Generando...' : '⬇️ Descargar escaleta.docx'}
          </button>
        </div>
      </div>
    </div>
  );
}
