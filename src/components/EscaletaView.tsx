'use client';

import { Escaleta } from '@/lib/types';

interface EscaletaViewProps {
  escaleta: Escaleta;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="mb-2">
      <span className="font-semibold text-gray-700">{label}: </span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

export default function EscaletaView({ escaleta }: EscaletaViewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">Escaleta del Libro</h1>

      <Section title="ADN del Libro">
        <Field label="Mundo" value={escaleta.adn.mundo} />
        <Field label="Motor del libro" value={escaleta.adn.motor} />
        <Field label="Centro emocional" value={escaleta.adn.centroEmocional} />
        <Field label="Centro ideológico" value={escaleta.adn.centroIdeologico} />
        <Field label="Final obligatorio" value={escaleta.adn.finalObligatorio} />
      </Section>

      <Section title="Personajes">
        {escaleta.personajes.map(p => (
          <div key={p.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800">{p.nombre || '(sin nombre)'}</h3>
            <Field label="Rol" value={p.rol} />
            <Field label="Función en el arco" value={p.funcionArco} />
            <Field label="Voz" value={p.voz} />
          </div>
        ))}
      </Section>

      <Section title="Estructura de Actos">
        {escaleta.actos.map(a => (
          <div key={a.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800">{a.titulo}</h3>
            <Field label="Tono" value={a.tono} />
            <Field label="Función narrativa" value={a.funcionNarrativa} />
            <Field label="Nota editorial" value={a.notaEditorial} />
          </div>
        ))}
      </Section>

      <Section title="Capítulos">
        <div className="space-y-3">
          {escaleta.capitulos.map(c => (
            <div key={c.id} className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-gray-800">
                Cap. {c.numero}: {c.titulo}
              </h3>
              <Field label="Función dramática" value={c.funcionDramatica} />
              <Field label="Giro funcional" value={c.giroFuncional} />
              <Field label="Cliffhanger/Cierre" value={c.cliffhanger} />
              <Field label="Cambio en el protagonista" value={c.cambioProt} />
            </div>
          ))}
        </div>
      </Section>

      {escaleta.semillas.length > 0 && (
        <Section title="Semillas y Payoffs">
          {escaleta.semillas.map(s => (
            <div key={s.id} className="mb-3 p-3 bg-yellow-50 rounded-lg">
              <h3 className="font-bold text-gray-800">{s.elemento}</h3>
              <Field label="Siembra" value={s.siembra} />
              <Field label="Cobro" value={s.cobro} />
              <Field label="Nota" value={s.nota} />
            </div>
          ))}
        </Section>
      )}

      {escaleta.momentosAntagonista.length > 0 && (
        <Section title="Aprendizaje Adaptativo del Antagonista">
          {escaleta.momentosAntagonista.map(m => (
            <div key={m.id} className="mb-2 p-3 bg-red-50 rounded-lg">
              <span className="font-semibold">Después del cap. {m.despuesDeCapitulo}: </span>
              {m.respuestaObligatoria}
            </div>
          ))}
        </Section>
      )}

      {escaleta.lineasRojas.length > 0 && (
        <Section title="Líneas Rojas">
          <ul className="list-disc list-inside space-y-1">
            {escaleta.lineasRojas.map((l, i) => (
              <li key={i} className="text-red-700">{l}</li>
            ))}
          </ul>
        </Section>
      )}

      {escaleta.checklistRedaccion.length > 0 && (
        <Section title="Checklist de Redacción">
          <ul className="list-disc list-inside space-y-1">
            {escaleta.checklistRedaccion.map((c, i) => (
              <li key={i} className="text-green-700">{c}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
