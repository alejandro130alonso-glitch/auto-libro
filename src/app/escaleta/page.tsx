'use client';
import Link from 'next/link';
import { useWizardState } from '@/hooks/useWizardState';
import EscaletaView from '@/components/EscaletaView';

export default function EscaletaPage() {
  const { escaleta, loaded } = useWizardState();

  if (!loaded) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Cargando...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Escaleta Completa</h1>
          <p className="text-gray-500 mt-1">Vista completa y estructurada de tu novela</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/wizard"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            ✏️ Editar
          </Link>
          <Link
            href="/generate"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            ⚡ Generar Libro →
          </Link>
        </div>
      </div>
      <EscaletaView escaleta={escaleta} />
    </div>
  );
}
