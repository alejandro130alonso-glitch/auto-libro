'use client';

import { ConfigIA } from '@/lib/types';

interface StepConfigIAProps {
  config: ConfigIA;
  onChange: (config: ConfigIA) => void;
}

const modelosPorProveedor: Record<ConfigIA['proveedor'], string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  gemini: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-pro'],
  claude: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229', 'claude-3-haiku-20240307'],
};

const etiquetasProveedor: Record<ConfigIA['proveedor'], string> = {
  openai: 'OpenAI (GPT)',
  gemini: 'Google Gemini',
  claude: 'Anthropic Claude',
};

export default function StepConfigIA({ config, onChange }: StepConfigIAProps) {
  const actualizar = <K extends keyof ConfigIA>(campo: K, valor: ConfigIA[K]) => {
    if (campo === 'proveedor') {
      const proveedor = valor as ConfigIA['proveedor'];
      onChange({
        ...config,
        proveedor,
        modelo: modelosPorProveedor[proveedor][0],
      });
    } else {
      onChange({ ...config, [campo]: valor });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-900 mb-2">Configuración de IA</h2>
      <p className="text-gray-600 mb-6">
        Configura el proveedor de IA que generará los capítulos. Tu API key se guarda solo en localStorage.
      </p>

      <div className="space-y-5">
        {/* Proveedor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Proveedor de IA</label>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(modelosPorProveedor) as ConfigIA['proveedor'][]).map(proveedor => (
              <button
                key={proveedor}
                onClick={() => actualizar('proveedor', proveedor)}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-colors ${
                  config.proveedor === proveedor
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {etiquetasProveedor[proveedor]}
              </button>
            ))}
          </div>
        </div>

        {/* API Key */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            API Key de {etiquetasProveedor[config.proveedor]}
          </label>
          <input
            type="password"
            value={config.apiKey}
            onChange={e => actualizar('apiKey', e.target.value)}
            placeholder={`Ingresa tu API key de ${etiquetasProveedor[config.proveedor]}...`}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent font-mono"
          />
          <p className="text-xs text-gray-400 mt-1">
            Se guarda en localStorage de tu navegador. Nunca se envía a nuestros servidores.
          </p>
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Modelo</label>
          <select
            value={config.modelo}
            onChange={e => actualizar('modelo', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          >
            {modelosPorProveedor[config.proveedor].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Longitud de palabras */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Longitud por capítulo: {config.longitudPalabras.toLocaleString('es')} palabras
          </label>
          <input
            type="range"
            min={500}
            max={6000}
            step={500}
            value={config.longitudPalabras}
            onChange={e => actualizar('longitudPalabras', Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>500 (corto)</span>
            <span>3.000 (estándar)</span>
            <span>6.000 (largo)</span>
          </div>
        </div>

        {/* Idioma */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Idioma de escritura</label>
          <select
            value={config.idioma}
            onChange={e => actualizar('idioma', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          >
            <option value="español">Español</option>
            <option value="inglés">Inglés</option>
            <option value="francés">Francés</option>
            <option value="alemán">Alemán</option>
            <option value="italiano">Italiano</option>
            <option value="portugués">Portugués</option>
          </select>
        </div>

        {/* Tono narrativo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tono narrativo</label>
          <select
            value={config.tonoNarrativo}
            onChange={e => actualizar('tonoNarrativo', e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          >
            <option value="literario">Literario (estilo culto, metáforas ricas)</option>
            <option value="comercial">Comercial (directo, ágil, entretenido)</option>
            <option value="noir">Noir (oscuro, seco, cínico)</option>
            <option value="épico">Épico (grandioso, mitológico)</option>
            <option value="íntimo">Íntimo (primera persona, confesional)</option>
            <option value="humorístico">Humorístico (ligero, irónico)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-bold text-blue-800 mb-2">✅ Resumen de configuración</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Proveedor: <strong>{etiquetasProveedor[config.proveedor]}</strong></li>
          <li>• Modelo: <strong>{config.modelo}</strong></li>
          <li>• Palabras por capítulo: <strong>{config.longitudPalabras.toLocaleString('es')}</strong></li>
          <li>• Idioma: <strong>{config.idioma}</strong></li>
          <li>• Tono: <strong>{config.tonoNarrativo}</strong></li>
        </ul>
      </div>
    </div>
  );
}
