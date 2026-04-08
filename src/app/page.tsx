import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="mb-6 text-7xl">📚</div>
      <h1 className="text-5xl font-bold text-indigo-900 mb-4">Auto-Libro</h1>
      <p className="text-xl text-gray-600 mb-3 max-w-2xl">
        Genera libros completos con inteligencia artificial.
        Define tu escaleta narrativa y deja que la IA escriba cada capítulo.
      </p>
      <p className="text-gray-500 mb-10 max-w-xl">
        Compatible con OpenAI, Google Gemini y Anthropic Claude.
        Tu API key permanece en tu navegador.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link
          href="/wizard"
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          🚀 Crear nuevo libro
        </Link>
        <Link
          href="/generate"
          className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
        >
          ⚡ Continuar generando
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white rounded-2xl p-6 shadow-md text-left">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="font-bold text-gray-900 mb-2">Escaleta profesional</h3>
          <p className="text-gray-500 text-sm">
            Wizard de 8 pasos para definir el ADN del libro, personajes, actos, capítulos, semillas y más.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md text-left">
          <div className="text-3xl mb-3">🤖</div>
          <h3 className="font-bold text-gray-900 mb-2">Generación con IA</h3>
          <p className="text-gray-500 text-sm">
            Usa OpenAI GPT-4, Google Gemini o Claude para generar cada capítulo respetando tu escaleta.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md text-left">
          <div className="text-3xl mb-3">📄</div>
          <h3 className="font-bold text-gray-900 mb-2">Exportar a DOCX</h3>
          <p className="text-gray-500 text-sm">
            Descarga el libro completo o la escaleta en formato Word, listo para editar.
          </p>
        </div>
      </div>

      <div className="mt-12 text-sm text-gray-400">
        Todo el progreso se guarda automáticamente en tu navegador.
      </div>
    </div>
  );
}
