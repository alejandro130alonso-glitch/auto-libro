'use client';
import { useState, useEffect, useCallback } from 'react';
import { Escaleta, DEFAULT_ESCALETA } from '@/lib/types';

const STORAGE_KEY = 'auto-libro-escaleta';

export function useWizardState() {
  const [escaleta, setEscaleta] = useState<Escaleta>(DEFAULT_ESCALETA);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setEscaleta(JSON.parse(saved));
        } catch {
          setEscaleta(DEFAULT_ESCALETA);
        }
      }
      setLoaded(true);
    }
  }, []);

  const updateEscaleta = useCallback((updates: Partial<Escaleta>) => {
    setEscaleta(prev => {
      const next = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const resetEscaleta = useCallback(() => {
    setEscaleta(DEFAULT_ESCALETA);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return { escaleta, updateEscaleta, resetEscaleta, loaded };
}
