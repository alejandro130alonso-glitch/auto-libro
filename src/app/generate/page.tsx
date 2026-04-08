'use client';
import Link from 'next/link';
import { useWizardState } from '@/hooks/useWizardState';
import { useBookGeneration } from '@/hooks/useBookGeneration';
import ProgressBar from '@/components/ProgressBar';

export default function GeneratePage() {
  const { escaleta, loaded } = useWizardState();
  const { estado, generarLibro, reanudarGeneracion, pausarGeneracion, resetGeneracion } = useBookGeneration();

  if (!loaded) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Cargando...</div>;
  }

  const handleGenerar = () => {
    if (estado.pausado) {
      reanudarGeneracion(escaleta, estado.capitulos);
    } else {
      generarLibro(escaleta);
    }
  };

  const totalCapitulos = escaleta.capitulos.length;
  const capitulosGenerados = estado.capitulos.length;
  const completado = !estado.enProgreso && !estado.pausado && capitulosGenerados > 0 && capitulosGenerados >= totalCapitulos;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">⚡ Generar Libro</h1>
      <p className="text-gray-500 mb-8">La IA escribirá tu libro capítulo a capítulo siguiendo la escaleta</p>

      {!escaleta.configIA.apiKey && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            ⚠️ No hay API key configurada. <Link href="/wizard" className="underline font-medium">Configura la IA en el wizard</Link> antes de generar.
          </p>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <ProgressBar
          current={capitulosGenerados}
          total={totalCapitulos}
          label={estado.enProgreso
            ? `Generando capítulo ${estado.capituloActual} de ${totalCapitulos}...`
            : completado
              ? '✅ ¡Libro generado completamente!'
              : estado.pausado
                ? `⏸️ Pausado — ${capitulosGenerados} capítulos generados`
                : `${capitulosGenerados} capítulos generados`}
        />

        {estado.error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
            ❌ Error: {estado.error}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {!estado.enProgreso ? (
            <>
              <button
                onClick={handleGenerar}
                disabled={!escaleta.configIA.apiKey}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors font-medium"
              >
                {estado.pausado ? '▶️ Reanudar' : capitulosGenerados > 0 ? '🔄 Reiniciar' : '🚀 Generar Libro'}
              </button>
              {capitulosGenerados > 0 && !estado.pausado && (
                <button
                  onClick={resetGeneracion}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  🗑️ Limpiar
                </button>
              )}
            </>
          ) : (
            <button
              onClick={pausarGeneracion}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
            >
              ⏸️ Pausar
            </button>
          )}

          {capitulosGenerados > 0 && (
            <Link
              href="/book"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📖 Leer libro
            </Link>
          )}
        </div>
      </div>

      {/* Generated chapters preview */}
      {estado.capitulos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Capítulos generados</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {estado.capitulos.map(cap => (
              <div key={cap.numero} className="border-l-4 border-green-400 pl-3">
                <h3 className="font-medium text-gray-800">Cap. {cap.numero}: {cap.titulo}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cap.resumen}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
