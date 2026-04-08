'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '🏠 Inicio' },
  { href: '/wizard', label: '✏️ Wizard' },
  { href: '/escaleta', label: '📋 Escaleta' },
  { href: '/generate', label: '⚡ Generar' },
  { href: '/book', label: '📖 Leer' },
  { href: '/export', label: '📥 Exportar' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          📚 Auto-Libro
        </Link>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
