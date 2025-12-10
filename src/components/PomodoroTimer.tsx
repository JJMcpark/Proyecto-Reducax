import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface PomodoroTimerProps {
  onComplete?: () => void;
}

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const TIMER_DURATIONS = {
  work: 25 * 60, // 25 minutos
  shortBreak: 5 * 60, // 5 minutos
  longBreak: 15 * 60, // 15 minutos
};

const MODE_LABELS = {
  work: 'Estudio',
  shortBreak: 'Descanso corto',
  longBreak: 'Descanso largo',
};

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onComplete }) => {
  const { colors } = useTheme();
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);

  const resetTimer = useCallback((newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer completado
      if (mode === 'work') {
        setSessions((prev) => prev + 1);
        // Después de 4 sesiones, descanso largo
        if ((sessions + 1) % 4 === 0) {
          resetTimer('longBreak');
        } else {
          resetTimer('shortBreak');
        }
      } else {
        resetTimer('work');
      }
      onComplete?.();
      // Notificación (si está permitida)
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro', {
          body: mode === 'work' ? '¡Tiempo de descanso!' : '¡Volvamos a estudiar!',
          icon: '📚',
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, sessions, resetTimer, onComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  const styles = {
    container: {
      position: 'fixed' as const,
      bottom: '1rem',
      right: '1rem',
      zIndex: 1000,
    },
    minimized: {
      background: colors.cardBackground,
      border: `2px solid ${colors.border}`,
      borderRadius: '50px',
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'all 0.2s ease',
    },
    expanded: {
      background: colors.cardBackground,
      border: `2px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '1.5rem',
      width: '280px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: colors.textPrimary,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      color: colors.textMuted,
      padding: '0.25rem',
    },
    modeSelector: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    modeButton: {
      flex: 1,
      padding: '0.5rem',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      background: 'transparent',
      color: colors.textSecondary,
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    modeButtonActive: {
      background: colors.accent,
      color: colors.backgroundSecondary,
      borderColor: colors.accent,
    },
    timerDisplay: {
      textAlign: 'center' as const,
      marginBottom: '1rem',
    },
    time: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: colors.textPrimary,
      fontFamily: 'monospace',
    },
    modeLabel: {
      fontSize: '0.875rem',
      color: colors.textMuted,
      marginTop: '0.25rem',
    },
    progressBar: {
      height: '6px',
      background: colors.backgroundTertiary,
      borderRadius: '3px',
      marginBottom: '1rem',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      background: mode === 'work' ? colors.accent : colors.success,
      borderRadius: '3px',
      transition: 'width 0.5s ease',
      width: `${progress}%`,
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.75rem',
    },
    controlButton: {
      padding: '0.75rem 1.5rem',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      background: isRunning ? 'transparent' : colors.accent,
      color: isRunning ? colors.textPrimary : colors.backgroundSecondary,
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
    },
    resetButton: {
      padding: '0.75rem',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      background: 'transparent',
      color: colors.textSecondary,
      cursor: 'pointer',
      fontSize: '1rem',
    },
    sessions: {
      textAlign: 'center' as const,
      marginTop: '1rem',
      fontSize: '0.75rem',
      color: colors.textMuted,
    },
  };

  if (isMinimized) {
    return (
      <div style={styles.container}>
        <div 
          style={styles.minimized}
          onClick={() => setIsMinimized(false)}
          title="Abrir Pomodoro Timer"
        >
          <span>🍅</span>
          <span style={{ 
            fontFamily: 'monospace', 
            fontWeight: 'bold',
            color: colors.textPrimary,
          }}>
            {formatTime(timeLeft)}
          </span>
          {isRunning && (
            <span style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              background: colors.success,
              animation: 'pulse 1s infinite',
            }} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.expanded}>
        <div style={styles.header}>
          <div style={styles.title}>
            <span>🍅</span>
            <span>Pomodoro</span>
          </div>
          <button 
            style={styles.closeButton}
            onClick={() => setIsMinimized(true)}
            title="Minimizar"
          >
            ─
          </button>
        </div>

        <div style={styles.modeSelector}>
          {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((m) => (
            <button
              key={m}
              style={{
                ...styles.modeButton,
                ...(mode === m ? styles.modeButtonActive : {}),
              }}
              onClick={() => resetTimer(m)}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        <div style={styles.timerDisplay}>
          <div style={styles.time}>{formatTime(timeLeft)}</div>
          <div style={styles.modeLabel}>{MODE_LABELS[mode]}</div>
        </div>

        <div style={styles.progressBar}>
          <div style={styles.progressFill} />
        </div>

        <div style={styles.controls}>
          <button
            style={styles.controlButton}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
          </button>
          <button
            style={styles.resetButton}
            onClick={() => resetTimer(mode)}
            title="Reiniciar"
          >
            🔄
          </button>
        </div>

        <div style={styles.sessions}>
          Sesiones completadas hoy: <strong>{sessions}</strong>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
