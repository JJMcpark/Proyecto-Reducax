import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      style={{
        position: 'relative',
        width: '52px',
        height: '28px',
        borderRadius: '9999px',
        border: '2px solid var(--border-dark)',
        cursor: 'pointer',
        background: isDark ? 'var(--text-primary)' : 'var(--bg-tertiary)',
        transition: 'all 0.3s ease',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: isDark ? '26px' : '4px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: isDark ? 'var(--bg-primary)' : 'var(--text-primary)',
          transition: 'left 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
        }}
      >
        <i className={isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'} style={{ color: isDark ? 'var(--text-primary)' : 'var(--bg-primary)' }}></i>
      </span>
    </button>
  );
};

export default ThemeToggle;
