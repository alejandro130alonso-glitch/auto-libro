'use client';

import { useEffect, useState } from 'react';
import { cargarEscaleta } from '@/lib/storage';
import { Escaleta } from '@/lib/types';
import EscaletaView from '@/components/EscaletaView';
import Link from 'next/link';

export default function EscaletaPage() {
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
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">No hay escaleta guardada</h2>
        <p className="text-gray-500 mb-6">Crea una escaleta usando el wizard antes de verla aquí.</p>
        <Link
          href="/wizard"
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          Ir al wizard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-900">Vista de Escaleta</h1>
        <div className="flex gap-3">
          <Link
            href="/wizard"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            ✏️ Editar
          </Link>
          <Link
            href="/export"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-semibold"
          >
            📄 Exportar
          </Link>
        </div>
      </div>
      <EscaletaView escaleta={escaleta} />
    </div>
  );
}
