'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/wizard', label: 'Escaleta' },
  { href: '/escaleta', label: 'Ver Escaleta' },
  { href: '/generate', label: 'Generar' },
  { href: '/book', label: 'Leer Libro' },
  { href: '/export', label: 'Exportar' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-xl tracking-tight">Auto-Libro</span>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === link.href
                    ? 'bg-indigo-700 text-white'
                    : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
