'use client';

import { useState } from 'react';
import { useWizardState } from '@/hooks/useWizardState';
import ProgressBar from '@/components/ProgressBar';
import StepADN from '@/components/wizard/StepADN';
import StepPersonajes from '@/components/wizard/StepPersonajes';
import StepActos from '@/components/wizard/StepActos';
import StepCapitulos from '@/components/wizard/StepCapitulos';
import StepSemillas from '@/components/wizard/StepSemillas';
import StepAntagonista from '@/components/wizard/StepAntagonista';
import StepLineasRojas from '@/components/wizard/StepLineasRojas';
import StepConfigIA from '@/components/wizard/StepConfigIA';
import { guardarEscaleta } from '@/lib/storage';
import Link from 'next/link';

const ETIQUETAS_PASOS = ['ADN', 'Personajes', 'Actos', 'Capítulos', 'Semillas', 'Antagonista', 'Reglas', 'IA'];

export default function WizardPage() {
  const { state, cargado, actualizarEscaleta, pasoSiguiente, pasoAnterior, reiniciar } = useWizardState();
  const [guardado, setGuardado] = useState(false);

  const { pasoActual, escaleta } = state;

  const handleGuardar = () => {
    guardarEscaleta(escaleta);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  if (!cargado) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4">Crear Escaleta</h1>
        <ProgressBar pasoActual={pasoActual} totalPasos={8} etiquetas={ETIQUETAS_PASOS} />
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        {pasoActual === 1 && (
          <StepADN
            adn={escaleta.adn}
            onChange={adn => actualizarEscaleta({ adn })}
          />
        )}
        {pasoActual === 2 && (
          <StepPersonajes
            personajes={escaleta.personajes}
            onChange={personajes => actualizarEscaleta({ personajes })}
          />
        )}
        {pasoActual === 3 && (
          <StepActos
            actos={escaleta.actos}
            onChange={actos => actualizarEscaleta({ actos })}
          />
        )}
        {pasoActual === 4 && (
          <StepCapitulos
            capitulos={escaleta.capitulos}
            actos={escaleta.actos}
            onChange={capitulos => actualizarEscaleta({ capitulos })}
          />
        )}
        {pasoActual === 5 && (
          <StepSemillas
            semillas={escaleta.semillas}
            onChange={semillas => actualizarEscaleta({ semillas })}
          />
        )}
        {pasoActual === 6 && (
          <StepAntagonista
            momentos={escaleta.momentosAntagonista}
            onChange={momentosAntagonista => actualizarEscaleta({ momentosAntagonista })}
          />
        )}
        {pasoActual === 7 && (
          <StepLineasRojas
            lineasRojas={escaleta.lineasRojas}
            checklistRedaccion={escaleta.checklistRedaccion}
            onChange={(lineasRojas, checklistRedaccion) =>
              actualizarEscaleta({ lineasRojas, checklistRedaccion })
            }
          />
        )}
        {pasoActual === 8 && (
          <StepConfigIA
            config={escaleta.configIA}
            onChange={configIA => actualizarEscaleta({ configIA })}
          />
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={pasoAnterior}
            disabled={pasoActual === 1}
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ← Anterior
          </button>
          <button
            onClick={reiniciar}
            className="px-4 py-3 rounded-xl text-sm text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            Reiniciar
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGuardar}
            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              guardado
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {guardado ? '✓ Guardado' : 'Guardar'}
          </button>

          {pasoActual < 8 ? (
            <button
              onClick={pasoSiguiente}
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Siguiente →
            </button>
          ) : (
            <Link
              href="/generate"
              onClick={handleGuardar}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
            >
              ¡Generar libro! 🚀
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
