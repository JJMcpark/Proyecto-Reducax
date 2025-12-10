import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: ROUTES.FEED, label: 'Feed', icon: 'fa-solid fa-house' },
  { path: ROUTES.PROFILE, label: 'Mi Perfil', icon: 'fa-solid fa-user' },
  { path: ROUTES.MESSAGES, label: 'Mensajes', icon: 'fa-solid fa-envelope' },
  { path: ROUTES.SETTINGS, label: 'Configuración', icon: 'fa-solid fa-gear' },
];

const educationItems = [
  { path: ROUTES.INSTITUTIONS, label: 'Instituciones', icon: 'fa-solid fa-building-columns' },
  { path: ROUTES.GROUPS, label: 'Grupos de Estudio', icon: 'fa-solid fa-users' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { colors, theme } = useTheme();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  if (!isOpen) return null;

  const styles: Record<string, React.CSSProperties> = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1039,
      animation: 'fadeIn 0.2s ease',
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '280px',
      background: colors.navBackground,
      color: colors.textPrimary,
      zIndex: 1040,
      paddingTop: '20px',
      transition: 'transform 0.3s ease',
      borderRight: `1px solid ${colors.border}`,
      animation: 'slideInLeft 0.3s ease',
    },
    header: {
      padding: '1rem 1.5rem',
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: colors.textPrimary,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      color: colors.textSecondary,
      fontSize: '1.25rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease',
    },
    nav: {
      padding: '1rem 0',
    },
    section: {
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      padding: '0.5rem 1.5rem',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.875rem 1.5rem',
      color: colors.textSecondary,
      textDecoration: 'none',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
    },
    linkActive: {
      color: colors.textPrimary,
      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      fontWeight: 600,
    },
    icon: {
      fontSize: '1.125rem',
      width: '24px',
      textAlign: 'center',
    },
  };

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            REDUCAX
          </h2>
          <button 
            style={styles.closeBtn} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.hoverBackground;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav style={styles.nav}>
          {/* Navegación Principal */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Principal</div>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...styles.link,
                  ...(isActive(item.path) ? styles.linkActive : {}),
                }}
                onClick={onClose}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = colors.hoverBackground;
                    e.currentTarget.style.color = colors.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                <i className={item.icon} style={styles.icon}></i>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Educación */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Educación</div>
            {educationItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                style={{
                  ...styles.link,
                  ...(isActive(item.path) ? styles.linkActive : {}),
                }}
                onClick={onClose}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = colors.hoverBackground;
                    e.currentTarget.style.color = colors.textPrimary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textSecondary;
                  }
                }}
              >
                <i className={item.icon} style={styles.icon}></i>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
