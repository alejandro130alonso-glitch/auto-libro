import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          📚 Auto-Libro
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Genera libros completos con IA usando una escaleta literaria profesional
        </p>
        <Link
          href="/wizard"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          🚀 Crear nuevo libro
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: '✏️', title: 'Wizard Inteligente', desc: 'Responde preguntas paso a paso para construir una escaleta literaria completa y profesional.' },
          { icon: '⚡', title: 'Generación por IA', desc: 'OpenAI, Google Gemini o Anthropic Claude generan cada capítulo guiados por tu escaleta.' },
          { icon: '📥', title: 'Exportación DOCX', desc: 'Descarga tu libro completo y la escaleta en formato Word con estructura profesional.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Flujo del Proceso</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { step: '1', label: 'Wizard de preguntas', desc: '8 pasos para definir tu libro' },
            { step: '2', label: 'Escaleta completa', desc: 'Revisa y edita la estructura' },
            { step: '3', label: 'Generación con IA', desc: 'Capítulo a capítulo, con progreso en tiempo real' },
            { step: '4', label: 'Exportar DOCX', desc: 'Libro y escaleta en formato Word' },
          ].map(({ step, label, desc }) => (
            <div key={step} className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {step}
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{label}</h4>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-blue-800 mb-3">🔒 Tu privacidad es prioritaria</h2>
        <p className="text-blue-700 text-sm">
          Toda la información — escaleta, capítulos generados y API keys — se guarda SOLO en el localStorage de tu navegador.
          No hay base de datos, no hay servidor de almacenamiento. Tú controlas tus datos completamente.
        </p>
      </div>
    </div>
  );
}
