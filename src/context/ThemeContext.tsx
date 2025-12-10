import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  colors: typeof lightColors;
}

// Colores Minimalistas B/N - Modo Claro
const lightColors = {
  // Fondos
  background: '#ffffff',
  backgroundSecondary: '#f9fafb',
  backgroundTertiary: '#f3f4f6',
  backgroundHover: '#e5e7eb',
  hoverBackground: '#f3f4f6',
  
  // Texto
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  
  // Acentos - Negro minimalista
  accent: '#111827',
  accentHover: '#374151',
  accentLight: '#f3f4f6',
  
  // Bordes - Gris más visible
  border: '#d1d5db',
  borderDark: '#9ca3af',
  borderLight: '#e5e7eb',
  
  // Estados
  success: '#059669',
  error: '#dc2626',
  warning: '#d97706',
  info: '#6b7280',
  
  // Navegación
  navBackground: '#ffffff',
  navBorder: '#e5e7eb',
  navText: '#111827',
  navTextMuted: '#6b7280',
  
  // Cards
  cardBackground: '#ffffff',
  cardHover: '#f9fafb',
  cardShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

// Colores Minimalistas B/N - Modo Oscuro
const darkColors = {
  // Fondos - Negro puro
  background: '#000000',
  backgroundSecondary: '#16181c',
  backgroundTertiary: '#1d1f23',
  backgroundHover: '#181818',
  hoverBackground: '#181818',
  
  // Texto
  textPrimary: '#e7e9ea',
  textSecondary: '#71767b',
  textMuted: '#536471',
  
  // Acentos - Blanco
  accent: '#ffffff',
  accentHover: '#d1d1d1',
  accentLight: '#1d1f23',
  
  // Bordes
  border: '#2f3336',
  borderDark: '#3e4144',
  borderLight: '#2f3336',
  
  // Estados
  success: '#00ba7c',
  error: '#f4212e',
  warning: '#ffad1f',
  info: '#71767b',
  
  // Navegación
  navBackground: '#000000',
  navBorder: '#2f3336',
  navText: '#e7e9ea',
  navTextMuted: '#71767b',
  
  // Cards
  cardBackground: '#000000',
  cardHover: '#080808',
  cardShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'reducax_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // Recuperar tema guardado o detectar preferencia del sistema
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Detectar preferencia del sistema
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const colors = theme === 'dark' ? darkColors : lightColors;

  // Aplicar variables CSS al documento
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar cada color como variable CSS
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Clase para el body
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Meta theme-color para navegadores móviles
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', colors.navBackground);
    }
  }, [theme, colors]);

  // Guardar preferencia
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

export { lightColors, darkColors };
export type { ThemeMode };
