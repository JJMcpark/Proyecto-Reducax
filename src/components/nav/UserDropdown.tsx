import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routes';

const styles = {
  container: {
    position: 'relative' as const,
  } as React.CSSProperties,
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.25rem',
  } as React.CSSProperties,
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#fff',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    border: '2px solid #fff',
  } as React.CSSProperties,
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    minWidth: '200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1050,
    overflow: 'hidden',
  } as React.CSSProperties,
  header: {
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
  } as React.CSSProperties,
  userName: {
    fontWeight: 'bold',
    fontSize: '0.9375rem',
    color: '#000',
  } as React.CSSProperties,
  userEmail: {
    fontSize: '0.8125rem',
    color: '#666',
    marginTop: '0.125rem',
  } as React.CSSProperties,
  menuItem: {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'transparent',
    border: 'none',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: '#000',
    textDecoration: 'none',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    background: '#e0e0e0',
    margin: 0,
  } as React.CSSProperties,
  logoutItem: {
    color: '#000',
    fontWeight: '500',
  } as React.CSSProperties,
};

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <button
        style={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div style={styles.avatar}>
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <div style={styles.userName}>{user?.username || 'Usuario'}</div>
            <div style={styles.userEmail}>{user?.email || 'usuario@email.com'}</div>
          </div>

          <Link
            to={ROUTES.PROFILE}
            style={styles.menuItem}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            👤 Mi perfil
          </Link>

          <Link
            to={ROUTES.MESSAGES}
            style={styles.menuItem}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            💬 Mensajes
          </Link>

          <Link
            to={ROUTES.SETTINGS}
            style={styles.menuItem}
            onClick={() => setIsOpen(false)}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            ⚙️ Configuración
          </Link>

          <div style={styles.divider} />

          <button
            style={{ ...styles.menuItem, ...styles.logoutItem }}
            onClick={handleLogout}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
