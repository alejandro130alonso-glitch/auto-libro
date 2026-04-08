'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWizardState } from '@/hooks/useWizardState';
import StepADN from '@/components/wizard/StepADN';
import StepPersonajes from '@/components/wizard/StepPersonajes';
import StepActos from '@/components/wizard/StepActos';
import StepCapitulos from '@/components/wizard/StepCapitulos';
import StepSemillas from '@/components/wizard/StepSemillas';
import StepAntagonista from '@/components/wizard/StepAntagonista';
import StepLineasRojas from '@/components/wizard/StepLineasRojas';
import StepConfigIA from '@/components/wizard/StepConfigIA';

const STEPS = [
  { title: 'ADN del Libro', subtitle: 'Los pilares fundamentales de tu historia' },
  { title: 'Personajes y Arcos', subtitle: 'Quién protagoniza la historia y cómo evoluciona' },
  { title: 'Estructura de Actos', subtitle: 'La arquitectura narrativa en bloques' },
  { title: 'Capítulos', subtitle: 'El detalle de cada capítulo' },
  { title: 'Semillas y Payoffs', subtitle: 'Elementos que se siembran y se cobran' },
  { title: 'Aprendizaje del Antagonista', subtitle: 'Cómo reacciona el enemigo' },
  { title: 'Líneas Rojas y Checklist', subtitle: 'Restricciones y reglas de redacción' },
  { title: 'Configuración de IA', subtitle: 'Proveedor, modelo y preferencias' },
];

export default function WizardPage() {
  const { escaleta, updateEscaleta, loaded } = useWizardState();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  if (!loaded) {
    return <div className="flex items-center justify-center h-64 text-gray-500">Cargando...</div>;
  }

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      router.push('/escaleta');
    }
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepADN data={escaleta.adn} onChange={adn => updateEscaleta({ adn })} />;
      case 1:
        return <StepPersonajes data={escaleta.personajes} onChange={personajes => updateEscaleta({ personajes })} />;
      case 2:
        return <StepActos data={escaleta.actos} onChange={actos => updateEscaleta({ actos })} />;
      case 3:
        return <StepCapitulos data={escaleta.capitulos} actos={escaleta.actos} onChange={capitulos => updateEscaleta({ capitulos })} />;
      case 4:
        return <StepSemillas data={escaleta.semillas} onChange={semillas => updateEscaleta({ semillas })} />;
      case 5:
        return <StepAntagonista data={escaleta.antagonistaMomentos} onChange={antagonistaMomentos => updateEscaleta({ antagonistaMomentos })} />;
      case 6:
        return (
          <StepLineasRojas
            lineasRojas={escaleta.lineasRojas}
            checklist={escaleta.checklistRedaccion}
            onChangeLineas={lineasRojas => updateEscaleta({ lineasRojas })}
            onChangeChecklist={checklistRedaccion => updateEscaleta({ checklistRedaccion })}
          />
        );
      case 7:
        return <StepConfigIA data={escaleta.configIA} onChange={configIA => updateEscaleta({ configIA })} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Paso {currentStep + 1} de {STEPS.length}</span>
          <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-1 mt-3">
          {STEPS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex-1 h-1 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{STEPS[currentStep].title}</h1>
        <p className="text-gray-500 mt-1">{STEPS[currentStep].subtitle}</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 hover:bg-gray-300 transition-colors font-medium"
        >
          ← Anterior
        </button>
        <button
          onClick={goNext}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {currentStep === STEPS.length - 1 ? '✓ Ver Escaleta' : 'Siguiente →'}
        </button>
      </div>
    </div>
  );
}
