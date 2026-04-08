'use client';

import { useEffect, useState } from 'react';
import { cargarGeneracion } from '@/lib/storage';
import { Capitulo } from '@/lib/types';
import BookReader from '@/components/BookReader';
import Link from 'next/link';

export default function BookPage() {
  const [capitulos, setCapitulos] = useState<Capitulo[]>([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const estado = cargarGeneracion();
    if (estado) setCapitulos(estado.capitulos);
    setCargado(true);
  }, []);

  if (!cargado) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const capitulosConContenido = capitulos.filter(c => c.contenido);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">Leer Libro</h1>
          <p className="text-sm text-gray-500 mt-1">
            {capitulosConContenido.length} capítulos generados
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/generate"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold"
          >
            ⚡ Generar más
          </Link>
          <Link
            href="/export"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-semibold"
          >
            📄 Exportar
          </Link>
        </div>
      </div>
      <BookReader capitulos={capitulos} />
    </div>
  );
}
