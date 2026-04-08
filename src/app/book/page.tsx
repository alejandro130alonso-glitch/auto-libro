'use client';
import { useBookGeneration } from '@/hooks/useBookGeneration';
import BookReader from '@/components/BookReader';
import Link from 'next/link';

export default function BookPage() {
  const { estado } = useBookGeneration();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📖 Leer Libro</h1>
          <p className="text-gray-500 mt-1">{estado.capitulos.length} capítulos disponibles</p>
        </div>
        <div className="flex gap-3">
          <Link href="/generate" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">
            ⚡ Generar más
          </Link>
          <Link href="/export" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            📥 Exportar
          </Link>
        </div>
      </div>
      <BookReader capitulos={estado.capitulos} />
    </div>
  );
}
