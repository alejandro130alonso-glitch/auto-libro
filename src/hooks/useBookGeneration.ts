'use client';
import { useState, useCallback, useRef } from 'react';
import { Escaleta, CapituloGenerado, EstadoGeneracion } from '@/lib/types';

const STORAGE_KEY = 'auto-libro-generacion';

const ESTADO_INICIAL: EstadoGeneracion = {
  capitulos: [],
  enProgreso: false,
  pausado: false,
  capituloActual: 0,
  totalCapitulos: 0,
  error: null,
};

function cargarEstadoInicial(): EstadoGeneracion {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fall through to default
      }
    }
  }
  return ESTADO_INICIAL;
}

export function useBookGeneration() {
  const [estado, setEstado] = useState<EstadoGeneracion>(cargarEstadoInicial);

  const pausadoRef = useRef(false);

  const guardarEstado = (nuevoEstado: EstadoGeneracion) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoEstado));
    }
  };

  const generarLibro = useCallback(async (escaleta: Escaleta) => {
    const totalCapitulos = escaleta.capitulos.length;
    pausadoRef.current = false;

    const estadoInicial: EstadoGeneracion = {
      capitulos: [],
      enProgreso: true,
      pausado: false,
      capituloActual: 0,
      totalCapitulos,
      error: null,
    };
    setEstado(estadoInicial);
    guardarEstado(estadoInicial);

    const capitulosGenerados: CapituloGenerado[] = [];

    for (let i = 0; i < escaleta.capitulos.length; i++) {
      if (pausadoRef.current) {
        setEstado(prev => {
          const next = { ...prev, enProgreso: false, pausado: true };
          guardarEstado(next);
          return next;
        });
        return;
      }

      const capitulo = escaleta.capitulos[i];
      setEstado(prev => ({ ...prev, capituloActual: i + 1 }));

      try {
        const response = await fetch('/api/generate-chapter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            escaleta,
            capitulo,
            capitulosAnteriores: capitulosGenerados,
            numeroTotal: totalCapitulos,
            provider: escaleta.configIA.proveedor,
            apiKey: escaleta.configIA.apiKey,
            model: escaleta.configIA.modelo,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error generando capítulo');
        }

        const data = await response.json();
        const capituloGenerado: CapituloGenerado = {
          numero: capitulo.numero,
          titulo: capitulo.titulo,
          contenido: data.contenido,
          resumen: data.resumen,
        };

        capitulosGenerados.push(capituloGenerado);

        setEstado(prev => {
          const next = {
            ...prev,
            capitulos: [...capitulosGenerados],
            capituloActual: i + 1,
          };
          guardarEstado(next);
          return next;
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        setEstado(prev => {
          const next = { ...prev, enProgreso: false, error: errorMsg };
          guardarEstado(next);
          return next;
        });
        return;
      }
    }

    setEstado(prev => {
      const next = { ...prev, enProgreso: false, pausado: false };
      guardarEstado(next);
      return next;
    });
  }, []);

  const reanudarGeneracion = useCallback(async (escaleta: Escaleta, capitulosYaGenerados: CapituloGenerado[]) => {
    const desde = capitulosYaGenerados.length;
    const totalCapitulos = escaleta.capitulos.length;
    pausadoRef.current = false;

    setEstado(prev => ({ ...prev, enProgreso: true, pausado: false, error: null }));

    const capitulosGenerados = [...capitulosYaGenerados];

    for (let i = desde; i < escaleta.capitulos.length; i++) {
      if (pausadoRef.current) {
        setEstado(prev => {
          const next = { ...prev, enProgreso: false, pausado: true };
          guardarEstado(next);
          return next;
        });
        return;
      }

      const capitulo = escaleta.capitulos[i];
      setEstado(prev => ({ ...prev, capituloActual: i + 1 }));

      try {
        const response = await fetch('/api/generate-chapter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            escaleta,
            capitulo,
            capitulosAnteriores: capitulosGenerados,
            numeroTotal: totalCapitulos,
            provider: escaleta.configIA.proveedor,
            apiKey: escaleta.configIA.apiKey,
            model: escaleta.configIA.modelo,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Error generando capítulo');
        }

        const data = await response.json();
        const capituloGenerado: CapituloGenerado = {
          numero: capitulo.numero,
          titulo: capitulo.titulo,
          contenido: data.contenido,
          resumen: data.resumen,
        };

        capitulosGenerados.push(capituloGenerado);

        setEstado(prev => {
          const next = {
            ...prev,
            capitulos: [...capitulosGenerados],
            capituloActual: i + 1,
          };
          guardarEstado(next);
          return next;
        });
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
        setEstado(prev => {
          const next = { ...prev, enProgreso: false, error: errorMsg };
          guardarEstado(next);
          return next;
        });
        return;
      }
    }

    setEstado(prev => {
      const next = { ...prev, enProgreso: false, pausado: false };
      guardarEstado(next);
      return next;
    });
  }, []);

  const pausarGeneracion = useCallback(() => {
    pausadoRef.current = true;
  }, []);

  const resetGeneracion = useCallback(() => {
    pausadoRef.current = false;
    const nuevoEstado: EstadoGeneracion = {
      capitulos: [],
      enProgreso: false,
      pausado: false,
      capituloActual: 0,
      totalCapitulos: 0,
      error: null,
    };
    setEstado(nuevoEstado);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return { estado, generarLibro, reanudarGeneracion, pausarGeneracion, resetGeneracion };
}
