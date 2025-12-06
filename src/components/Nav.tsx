import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './nav/SearchBar';
import UserDropdown from './nav/UserDropdown';
import NotificationDropdown from './nav/NotificationDropdown';
import { ROUTES } from '../routes/routes';

interface NavProps {
  onToggleSidebar: () => void;
}

const styles = {
  nav: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '56px',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1rem',
    zIndex: 1030,
    borderBottom: '2px solid #333',
  } as React.CSSProperties,
  menuButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '1.25rem',
    padding: '0.5rem',
    marginRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#fff',
    marginRight: '2rem',
  } as React.CSSProperties,
  brandIcon: {
    fontSize: '1.5rem',
  } as React.CSSProperties,
  brandText: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
  } as React.CSSProperties,
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    flex: 1,
  } as React.CSSProperties,
  navLink: {
    color: '#ccc',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  navLinkActive: {
    color: '#fff',
    background: '#333',
  } as React.CSSProperties,
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginLeft: 'auto',
  } as React.CSSProperties,
};

const Nav: React.FC<NavProps> = ({ onToggleSidebar }) => {
  const location = useLocation();

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.startsWith(path + '/');

  const navItems = [
    { path: ROUTES.FEED, label: 'Feed' },
    { path: ROUTES.PROFILE, label: 'Perfil' },
    { path: ROUTES.MESSAGES, label: 'Mensajes' },
  ];

  return (
    <nav style={styles.nav}>
      {/* Menu toggle button */}
      <button
        style={styles.menuButton}
        onClick={onToggleSidebar}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Brand/Logo */}
      <Link to={ROUTES.FEED} style={styles.brand}>
        <span style={styles.brandIcon}>📚</span>
        <span style={styles.brandText}>Reducax</span>
      </Link>

      {/* Navigation Links */}
      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navLink,
              ...(isActive(item.path) ? styles.navLinkActive : {}),
            }}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = '#222';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.color = '#ccc';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right section */}
      <div style={styles.rightSection}>
        <SearchBar />
        <NotificationDropdown />
        <UserDropdown />
      </div>
    </nav>
  );
};

export default Nav;
