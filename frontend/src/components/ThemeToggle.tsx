'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={`inline-flex items-center justify-center gap-2 p-2 rounded-2xl transition-all border ${
        isDark
          ? 'bg-cacao-850 hover:bg-cacao-800 text-pastel-amberText border-cacao-700 shadow-soft'
          : 'bg-white hover:bg-pastel-sand text-sucrenita-700 border-pastel-sandDark shadow-soft'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#D4A853]" />
      ) : (
        <Moon className="w-4 h-4 text-sucrenita-800" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      )}
    </button>
  );
}

