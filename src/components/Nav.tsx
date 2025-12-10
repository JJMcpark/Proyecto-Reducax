import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './nav/SearchBar';
import UserDropdown from './nav/UserDropdown';
import NotificationDropdown from './nav/NotificationDropdown';
import ThemeToggle from './nav/ThemeToggle';
import { ROUTES } from '../routes/routes';

interface NavProps {
  onToggleSidebar: () => void;
}

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

const POMODORO_TIMES = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_LABELS = {
  work: 'Estudio',
  shortBreak: 'Descanso',
  longBreak: 'Descanso largo',
};

const Nav: React.FC<NavProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const pomodoroRef = useRef<HTMLDivElement>(null);

  // Pomodoro State
  const [pomodoroTime, setPomodoroTime] = useState(POMODORO_TIMES.work);
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>('work');
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [customTimes, setCustomTimes] = useState(POMODORO_TIMES);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [cyclesForLongBreak, setCyclesForLongBreak] = useState(4);

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: ROUTES.FEED, label: 'Feed', icon: 'fa-solid fa-house' },
    { path: ROUTES.PROFILE, label: 'Perfil', icon: 'fa-solid fa-user' },
    { path: ROUTES.MESSAGES, label: 'Mensajes', icon: 'fa-solid fa-envelope' },
  ];

  // Cerrar pomodoro al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pomodoroRef.current && !pomodoroRef.current.contains(event.target as Node)) {
        setIsPomodoroOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Pomodoro Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Sonido de notificación
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdHCBgoV9cXFye4GBe3Rxc3l9gH58dXN0eHt8fHp2dHR3ent7eXd1dXd5ent6eXh3d3h5enp5eXh4eHl5enl5eXl5eXl5eXl5eXl5eXl5');
      audio.volume = 0.5;
      audio.play().catch(() => {});
      
      if (pomodoroMode === 'work') {
        setSessions(prev => prev + 1);
        if ((sessions + 1) % cyclesForLongBreak === 0) {
          setPomodoroMode('longBreak');
          setPomodoroTime(customTimes.longBreak);
        } else {
          setPomodoroMode('shortBreak');
          setPomodoroTime(customTimes.shortBreak);
        }
        // En modo automático, continúa automáticamente
        if (isAutoMode) {
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }
      } else {
        setPomodoroMode('work');
        setPomodoroTime(customTimes.work);
        if (isAutoMode) {
          setIsRunning(true);
        } else {
          setIsRunning(false);
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, pomodoroTime, pomodoroMode, sessions]);

  const togglePomodoro = useCallback(() => setIsRunning(prev => !prev), []);
  
  const resetPomodoro = useCallback(() => {
    setIsRunning(false);
    setPomodoroTime(customTimes[pomodoroMode]);
  }, [pomodoroMode, customTimes]);

  const changeMode = useCallback((mode: PomodoroMode) => {
    setPomodoroMode(mode);
    setPomodoroTime(customTimes[mode]);
    setIsRunning(false);
  }, [customTimes]);

  const adjustTime = useCallback((delta: number) => {
    if (!isRunning) {
      const currentMinutes = Math.floor(customTimes[pomodoroMode] / 60);
      const newMinutes = Math.max(5, Math.min(99, currentMinutes + delta));
      const newTime = newMinutes * 60;
      setPomodoroTime(newTime);
      setCustomTimes(prev => ({ ...prev, [pomodoroMode]: newTime }));
    }
  }, [isRunning, pomodoroMode, customTimes]);

  const adjustCycles = useCallback((delta: number) => {
    setCyclesForLongBreak(prev => Math.max(2, Math.min(10, prev + delta)));
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calcular progreso basado en el tiempo personalizado actual
  const totalTime = customTimes[pomodoroMode];
  const progress = totalTime > 0 ? ((totalTime - pomodoroTime) / totalTime) * 100 : 0;

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '56px',
      background: 'var(--nav-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem',
      zIndex: 1030,
      borderBottom: '1px solid var(--border-default)',
      transition: 'all 0.3s ease',
    }}>
      {/* LEFT SIDE: Menu + Search + Nav Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
        {/* Menu Button */}
        <button
          onClick={onToggleSidebar}
          aria-label="Abrir menú"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            fontSize: '1.125rem',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* SearchBar */}
        <SearchBar />

        {/* Nav Items as circular buttons */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            title={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              color: isActive(item.path) ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              borderRadius: '50%',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              background: isActive(item.path) ? 'var(--bg-tertiary)' : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'var(--bg-hover)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isActive(item.path) ? 'var(--bg-tertiary)' : 'transparent';
            }}
          >
            <i className={item.icon}></i>
          </Link>
        ))}
      </div>

      {/* CENTER: Pomodoro Timer */}
      <div ref={pomodoroRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setIsPomodoroOpen(!isPomodoroOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 1.25rem',
            background: isRunning 
              ? (pomodoroMode === 'work' ? 'var(--accent-primary)' : pomodoroMode === 'longBreak' ? '#9333ea' : 'var(--success)') 
              : 'var(--bg-tertiary)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: isRunning ? 'var(--bg-primary)' : 'var(--text-primary)',
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            transition: 'all 0.2s ease',
            minWidth: '100px',
          }}
        >
          {formatTime(pomodoroTime)}
        </button>

        {/* Dropdown Panel */}
        {isPomodoroOpen && (
          <div className="pomodoro-dropdown" style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-default)',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: 1050,
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-default)',
            }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <i className="fa-solid fa-clock"></i>
                Pomodoro
              </span>
              <span style={{
                fontSize: '0.6875rem',
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)',
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
              }}>
                {sessions} sesiones
              </span>
            </div>

            {/* Mode Selector */}
            <div style={{
              display: 'flex',
              gap: '0.375rem',
              marginBottom: '1rem',
            }}>
              {(['work', 'shortBreak', 'longBreak'] as PomodoroMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => changeMode(m)}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.25rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: pomodoroMode === m ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: pomodoroMode === m ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>

            {/* Timer Display with +/- controls */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => adjustTime(-5)}
                  disabled={isRunning}
                  style={{
                    width: '40px',
                    height: '36px',
                    border: 'none',
                    borderRadius: '8px',
                    background: isRunning ? 'var(--bg-tertiary)' : 'var(--bg-hover)',
                    color: isRunning ? 'var(--text-secondary)' : 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    opacity: isRunning ? 0.5 : 1,
                  }}
                >
                  -5
                </button>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  minWidth: '140px',
                }}>
                  {formatTime(pomodoroTime)}
                </div>
                <button
                  onClick={() => adjustTime(5)}
                  disabled={isRunning}
                  style={{
                    width: '40px',
                    height: '36px',
                    border: 'none',
                    borderRadius: '8px',
                    background: isRunning ? 'var(--bg-tertiary)' : 'var(--bg-hover)',
                    color: isRunning ? 'var(--text-secondary)' : 'var(--text-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    opacity: isRunning ? 0.5 : 1,
                  }}
                >
                  +5
                </button>
              </div>
            </div>

            {/* Auto Mode & Cycles - Compact icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              gap: '0.5rem',
            }}>
              {/* Auto Mode Toggle */}
              <button
                onClick={() => setIsAutoMode(!isAutoMode)}
                title={isAutoMode ? 'Modo Automático (clic para manual)' : 'Modo Manual (clic para automático)'}
                style={{
                  width: '40px',
                  height: '40px',
                  border: isAutoMode ? 'none' : '1px solid var(--border-default)',
                  borderRadius: '8px',
                  background: isAutoMode ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                  color: isAutoMode ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className={isAutoMode ? 'fa-solid fa-repeat' : 'fa-solid fa-hand'}></i>
              </button>

              {/* Cycles indicator - compact with number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.5rem 0.5rem',
                background: 'var(--bg-tertiary)',
                borderRadius: '8px',
              }}>
                <button
                  onClick={() => adjustCycles(-1)}
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    borderRadius: '6px',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.375rem',
                  padding: '0 0.25rem',
                  minWidth: '50px',
                  justifyContent: 'center',
                }}>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    {sessions % cyclesForLongBreak}/{cyclesForLongBreak}
                  </span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}></i>
                  <i className="fa-solid fa-bed" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}></i>
                </div>
                <button
                  onClick={() => adjustCycles(1)}
                  style={{
                    width: '28px',
                    height: '28px',
                    border: 'none',
                    borderRadius: '6px',
                    background: 'var(--bg-hover)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              height: '4px',
              background: 'var(--bg-tertiary)',
              borderRadius: '2px',
              marginBottom: '1rem',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${progress}%`,
                background: pomodoroMode === 'work' ? 'var(--accent-primary)' : pomodoroMode === 'longBreak' ? '#9333ea' : 'var(--success)',
                borderRadius: '2px',
                transition: 'width 1s linear',
              }} />
            </div>

            {/* Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <button
                onClick={togglePomodoro}
                style={{
                  flex: 1,
                  padding: '0.625rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: isRunning ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
                  color: isRunning ? 'var(--text-primary)' : 'var(--bg-primary)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className={isRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play'}></i>
                {isRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button
                onClick={resetPomodoro}
                style={{
                  padding: '0.625rem 0.875rem',
                  border: '1px solid var(--border-default)',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                <i className="fa-solid fa-rotate-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: REDUCAX + Separator + Theme + Notifications + User */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'flex-end' }}>
        {/* Logo REDUCAX */}
        <Link to={ROUTES.FEED} style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>REDUCAX</span>
        </Link>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--border-default)', margin: '0 0.5rem' }} />
        
        <ThemeToggle />
        <NotificationDropdown />
        <UserDropdown />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .pomodoro-dropdown {
            position: fixed !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: 90vw !important;
            max-width: 320px !important;
          }
        }
        .pomodoro-dropdown {
          animation: dropdownFadeIn 0.15s ease-out;
        }
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;
