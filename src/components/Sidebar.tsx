import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1039,
  } as React.CSSProperties,
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    height: '100%',
    width: '260px',
    background: '#000',
    color: '#fff',
    zIndex: 1040,
    paddingTop: '60px',
    transition: 'transform 0.3s ease',
  } as React.CSSProperties,
  header: {
    padding: '1rem 1.25rem',
    borderBottom: '1px solid #333',
  } as React.CSSProperties,
  title: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: 0,
  } as React.CSSProperties,
  nav: {
    padding: '1rem 0',
  } as React.CSSProperties,
  section: {
    marginBottom: '1rem',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    padding: '0.5rem 1.25rem',
  } as React.CSSProperties,
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.25rem',
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '0.9375rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  linkActive: {
    color: '#fff',
    background: '#333',
    borderLeft: '3px solid #fff',
  } as React.CSSProperties,
  icon: {
    fontSize: '1.125rem',
    width: '24px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
};

const menuItems = [
  { path: ROUTES.FEED, label: 'Feed', icon: '🏠' },
  { path: ROUTES.PROFILE, label: 'Mi Perfil', icon: '👤' },
  { path: ROUTES.MESSAGES, label: 'Mensajes', icon: '💬' },
  { path: ROUTES.SETTINGS, label: 'Configuración', icon: '⚙️' },
];

const educationItems = [
  { path: ROUTES.INSTITUTIONS, label: 'Instituciones', icon: '🏫' },
  { path: '#', label: 'Materias', icon: '📚' },
  { path: '#', label: 'Grupos de Estudio', icon: '👥' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div style={styles.overlay} onClick={onClose} />

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <h2 style={styles.title}>📚 Menú</h2>
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
                    e.currentTarget.style.background = '#222';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ccc';
                  }
                }}
              >
                <span style={styles.icon}>{item.icon}</span>
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
                style={styles.link}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#222';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#ccc';
                }}
              >
                <span style={styles.icon}>{item.icon}</span>
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
