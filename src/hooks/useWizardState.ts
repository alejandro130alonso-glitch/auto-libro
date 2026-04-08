'use client';

import { useState, useEffect, useCallback } from 'react';
import { WizardState, WizardStep, Escaleta } from '@/lib/types';
import { guardarWizard, cargarWizard, escaletaVacia } from '@/lib/storage';

const estadoInicial = (): WizardState => ({
  pasoActual: 1,
  escaleta: escaletaVacia(),
});

export function useWizardState() {
  const [state, setState] = useState<WizardState>(estadoInicial);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const guardado = cargarWizard();
    if (guardado) setState(guardado);
    setCargado(true);
  }, []);

  const actualizar = useCallback((nuevoState: Partial<WizardState>) => {
    setState(prev => {
      const siguiente = { ...prev, ...nuevoState };
      guardarWizard(siguiente);
      return siguiente;
    });
  }, []);

  const actualizarEscaleta = useCallback((cambios: Partial<Escaleta>) => {
    setState(prev => {
      const siguiente = {
        ...prev,
        escaleta: { ...prev.escaleta, ...cambios },
      };
      guardarWizard(siguiente);
      return siguiente;
    });
  }, []);

  const irAPaso = useCallback((paso: WizardStep) => {
    setState(prev => {
      const siguiente = { ...prev, pasoActual: paso };
      guardarWizard(siguiente);
      return siguiente;
    });
  }, []);

  const pasoSiguiente = useCallback(() => {
    setState(prev => {
      if (prev.pasoActual >= 8) return prev;
      const siguiente = { ...prev, pasoActual: (prev.pasoActual + 1) as WizardStep };
      guardarWizard(siguiente);
      return siguiente;
    });
  }, []);

  const pasoAnterior = useCallback(() => {
    setState(prev => {
      if (prev.pasoActual <= 1) return prev;
      const siguiente = { ...prev, pasoActual: (prev.pasoActual - 1) as WizardStep };
      guardarWizard(siguiente);
      return siguiente;
    });
  }, []);

  const reiniciar = useCallback(() => {
    const nuevo = estadoInicial();
    setState(nuevo);
    guardarWizard(nuevo);
  }, []);

  return {
    state,
    cargado,
    actualizar,
    actualizarEscaleta,
    irAPaso,
    pasoSiguiente,
    pasoAnterior,
    reiniciar,
  };
}
