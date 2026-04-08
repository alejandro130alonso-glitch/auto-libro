'use client';
import { Escaleta } from '@/lib/types';

interface EscaletaViewProps {
  escaleta: Escaleta;
}

export default function EscaletaView({ escaleta }: EscaletaViewProps) {
  const { adn, personajes, actos, capitulos, semillas, antagonistaMomentos, lineasRojas, checklistRedaccion } = escaleta;

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Section title="🧬 ADN del Libro">
        <div className="grid gap-3">
          {[
            { label: 'Mundo', value: adn.mundo },
            { label: 'Motor del libro', value: adn.motorLibro },
            { label: 'Centro emocional', value: adn.centroEmocional },
            { label: 'Centro ideológico', value: adn.centroIdeologico },
            { label: 'Final obligatorio', value: adn.finalObligatorio },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded p-3">
              <span className="font-semibold text-gray-700">{label}: </span>
              <span className="text-gray-600">{value || <em className="text-gray-400">Sin definir</em>}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="👥 Personajes y Arcos">
        <div className="grid gap-4">
          {personajes.map(p => (
            <div key={p.id} className="bg-gray-50 rounded p-4 border-l-4 border-blue-400">
              <h3 className="font-bold text-lg text-gray-800">{p.nombre || 'Sin nombre'} <span className="text-sm font-normal text-gray-500">({p.funcionNarrativa})</span></h3>
              <p className="text-sm text-gray-600 mt-1"><span className="font-medium">Arco:</span> {p.arco || 'Sin definir'}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Voz:</span> {p.voz || 'Sin definir'}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="🎭 Estructura de Actos">
        <div className="grid gap-4">
          {actos.map(a => (
            <div key={a.id} className="bg-gray-50 rounded p-4 border-l-4 border-green-400">
              <h3 className="font-bold text-gray-800">{a.titulo}</h3>
              <p className="text-sm text-gray-600"><span className="font-medium">Tono:</span> {a.tono || 'Sin definir'}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Función:</span> {a.funcionNarrativa || 'Sin definir'}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Nota editorial:</span> {a.notaEditorial || 'Sin definir'}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="📖 Capítulos">
        <div className="grid gap-3">
          {capitulos.map(c => (
            <div key={c.id} className="bg-gray-50 rounded p-3 border-l-4 border-purple-400">
              <h3 className="font-bold text-gray-800">Cap. {c.numero}: {c.titulo}</h3>
              <div className="text-sm text-gray-600 mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                <p><span className="font-medium">Función:</span> {c.funcionDramatica || 'Sin definir'}</p>
                <p><span className="font-medium">Giro:</span> {c.giroFuncional || 'Sin definir'}</p>
                <p><span className="font-medium">Cliffhanger:</span> {c.cliffhanger || 'Sin definir'}</p>
                <p><span className="font-medium">Cambio:</span> {c.cambioProtagonista || 'Sin definir'}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {semillas.length > 0 && (
        <Section title="🌱 Semillas y Payoffs">
          <div className="grid gap-3">
            {semillas.map(s => (
              <div key={s.id} className="bg-gray-50 rounded p-3 border-l-4 border-yellow-400">
                <h3 className="font-bold text-gray-800">{s.elemento}</h3>
                <p className="text-sm text-gray-600"><span className="font-medium">Siembra:</span> {s.siembra} → <span className="font-medium">Cobro:</span> {s.cobro}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Nota:</span> {s.nota}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {antagonistaMomentos.length > 0 && (
        <Section title="🎯 Aprendizaje Adaptativo del Antagonista">
          <div className="grid gap-3">
            {antagonistaMomentos.map(m => (
              <div key={m.id} className="bg-gray-50 rounded p-3 border-l-4 border-red-400">
                <p className="text-sm text-gray-600"><span className="font-medium">Después del cap. {m.despuesDeCapitulo}:</span> {m.respuestaObligatoria}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {lineasRojas.length > 0 && (
        <Section title="🚫 Líneas Rojas">
          <ul className="list-none space-y-2">
            {lineasRojas.map((l, i) => (
              <li key={i} className="bg-red-50 border border-red-200 rounded p-2 text-sm text-gray-700">• {l}</li>
            ))}
          </ul>
        </Section>
      )}

      {checklistRedaccion.length > 0 && (
        <Section title="✅ Checklist de Redacción">
          <ul className="list-none space-y-2">
            {checklistRedaccion.map((c, i) => (
              <li key={i} className="bg-green-50 border border-green-200 rounded p-2 text-sm text-gray-700">✓ {c}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
