'use client';

import { useState, useCallback, useRef } from 'react';
import { EstadoGeneracion, Escaleta, Capitulo } from '@/lib/types';
import { generarCapitulo } from '@/lib/ai-providers';
import { guardarGeneracion, cargarGeneracion } from '@/lib/storage';

function estadoInicial(escaleta: Escaleta): EstadoGeneracion {
  return {
    capituloActual: 0,
    totalCapitulos: escaleta.capitulos.length,
    capitulos: escaleta.capitulos,
    resumenCapitulosAnteriores: [],
    completado: false,
    pausado: false,
  };
}

export function useBookGeneration(escaleta: Escaleta) {
  const [estado, setEstado] = useState<EstadoGeneracion>(() => {
    const guardado = cargarGeneracion();
    return guardado ?? estadoInicial(escaleta);
  });

  const pausadoRef = useRef(false);
  const [generando, setGenerando] = useState(false);

  const actualizarEstado = useCallback((nuevoEstado: EstadoGeneracion) => {
    setEstado(nuevoEstado);
    guardarGeneracion(nuevoEstado);
  }, []);

  const generarLibro = useCallback(async (desdeCapitulo = 1) => {
    pausadoRef.current = false;
    setGenerando(true);

    let estadoActual: EstadoGeneracion = {
      ...estado,
      pausado: false,
      error: undefined,
      capituloActual: desdeCapitulo - 1,
    };

    actualizarEstado(estadoActual);

    for (let i = desdeCapitulo; i <= escaleta.capitulos.length; i++) {
      if (pausadoRef.current) {
        estadoActual = { ...estadoActual, pausado: true };
        actualizarEstado(estadoActual);
        setGenerando(false);
        return;
      }

      estadoActual = { ...estadoActual, capituloActual: i };
      actualizarEstado(estadoActual);

      try {
        const contenido = await generarCapitulo(
          escaleta,
          i,
          estadoActual.resumenCapitulosAnteriores
        );

        const capitulosActualizados: Capitulo[] = estadoActual.capitulos.map(c =>
          c.numero === i ? { ...c, contenido } : c
        );

        const resumen = `Cap. ${i} "${escaleta.capitulos[i - 1]?.titulo}": ${contenido.slice(0, 200)}...`;

        estadoActual = {
          ...estadoActual,
          capitulos: capitulosActualizados,
          resumenCapitulosAnteriores: [...estadoActual.resumenCapitulosAnteriores, resumen],
        };
        actualizarEstado(estadoActual);
      } catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        estadoActual = { ...estadoActual, error: mensaje, pausado: true };
        actualizarEstado(estadoActual);
        setGenerando(false);
        return;
      }
    }

    estadoActual = { ...estadoActual, completado: true };
    actualizarEstado(estadoActual);
    setGenerando(false);
  }, [escaleta, estado, actualizarEstado]);

  const pausar = useCallback(() => {
    pausadoRef.current = true;
  }, []);

  const reanudar = useCallback(() => {
    const siguienteCapitulo = estado.capituloActual + 1;
    generarLibro(siguienteCapitulo);
  }, [estado.capituloActual, generarLibro]);

  const reiniciar = useCallback(() => {
    const nuevo = estadoInicial(escaleta);
    actualizarEstado(nuevo);
  }, [escaleta, actualizarEstado]);

  return {
    estado,
    generando,
    generarLibro,
    pausar,
    reanudar,
    reiniciar,
  };
}
