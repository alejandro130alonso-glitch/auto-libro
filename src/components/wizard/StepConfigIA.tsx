'use client';
import { ConfigIA, MODELOS_POR_PROVEEDOR, PALABRAS_OPCIONES, TONOS_NARRATIVOS } from '@/lib/types';

interface StepConfigIAProps {
  data: ConfigIA;
  onChange: (data: ConfigIA) => void;
}

export default function StepConfigIA({ data, onChange }: StepConfigIAProps) {
  const modelos = MODELOS_POR_PROVEEDOR[data.proveedor] || [];

  const handleProveedorChange = (proveedor: ConfigIA['proveedor']) => {
    const primerModelo = MODELOS_POR_PROVEEDOR[proveedor][0];
    onChange({ ...data, proveedor, modelo: primerModelo });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-800">
        <strong>🔒 Privacidad:</strong> Tu API key se guarda solo en el localStorage de tu navegador. Nunca se envía a ningún servidor propio ni se almacena externamente.
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Proveedor de IA</label>
        <div className="grid grid-cols-3 gap-3">
          {(['openai', 'gemini', 'claude'] as const).map(p => (
            <button
              key={p}
              onClick={() => handleProveedorChange(p)}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                data.proveedor === p
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {p === 'openai' ? '🤖 OpenAI' : p === 'gemini' ? '✨ Gemini' : '🎭 Claude'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">API Key</label>
        <input
          type="password"
          value={data.apiKey}
          onChange={e => onChange({ ...data, apiKey: e.target.value })}
          placeholder="sk-... / AIza... / sk-ant-..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Modelo</label>
        <select
          value={data.modelo}
          onChange={e => onChange({ ...data, modelo: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {modelos.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Palabras por capítulo</label>
        <select
          value={data.palabrasPorCapitulo}
          onChange={e => onChange({ ...data, palabrasPorCapitulo: parseInt(e.target.value) })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {PALABRAS_OPCIONES.map(n => (
            <option key={n} value={n}>{n.toLocaleString()} palabras</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Idioma</label>
          <input
            type="text"
            value={data.idioma}
            onChange={e => onChange({ ...data, idioma: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tono Narrativo</label>
          <select
            value={data.tonoNarrativo}
            onChange={e => onChange({ ...data, tonoNarrativo: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TONOS_NARRATIVOS.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
