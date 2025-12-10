import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import CustomAlert from './CustomAlert';

const Footer: React.FC = () => {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();
  const [showWipAlert, setShowWipAlert] = useState(false);
  const [wipFeature, setWipFeature] = useState('');

  const handleWipClick = (e: React.MouseEvent, featureName: string) => {
    e.preventDefault();
    setWipFeature(featureName);
    setShowWipAlert(true);
  };

  const styles = {
    footer: {
      background: colors.navBackground,
      color: colors.navText,
      padding: '2rem 1rem',
      marginTop: 'auto',
      transition: 'background-color 0.3s ease',
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between',
      gap: '2rem',
    } as React.CSSProperties,
    section: {
      flex: '1',
      minWidth: '200px',
    } as React.CSSProperties,
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    } as React.CSSProperties,
    brandText: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: colors.navText,
    } as React.CSSProperties,
    description: {
      fontSize: '0.875rem',
      color: colors.navTextMuted,
      lineHeight: '1.6',
    } as React.CSSProperties,
    title: {
      fontSize: '1rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      color: colors.navText,
    } as React.CSSProperties,
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: colors.navTextMuted,
      textDecoration: 'none',
      fontSize: '0.875rem',
      marginBottom: '0.5rem',
      transition: 'color 0.2s ease',
    } as React.CSSProperties,
    bottom: {
      borderTop: `1px solid ${colors.border}`,
      marginTop: '2rem',
      paddingTop: '1rem',
      textAlign: 'center' as const,
      fontSize: '0.8125rem',
      color: colors.navTextMuted,
    } as React.CSSProperties,
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.section}>
          <div style={styles.brand}>
            <i className="fa-solid fa-book-open" style={{ fontSize: '1.5rem' }}></i>
            <span style={styles.brandText}>REDUCAX</span>
          </div>
          <p style={styles.description}>
            La red social educativa que conecta estudiantes, docentes e instituciones para un aprendizaje colaborativo.
          </p>
        </div>

        {/* Enlaces */}
        <div style={styles.section}>
          <h4 style={styles.title}>Navegación</h4>
          <Link to="/feed" style={styles.link}>
            <i className="fa-solid fa-house"></i> Feed
          </Link>
          <Link to="/profile" style={styles.link}>
            <i className="fa-solid fa-user"></i> Mi Perfil
          </Link>
          <Link to="/messages" style={styles.link}>
            <i className="fa-solid fa-envelope"></i> Mensajes
          </Link>
        </div>

        {/* Recursos */}
        <div style={styles.section}>
          <h4 style={styles.title}>Recursos</h4>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Centro de Ayuda')}>
            <i className="fa-solid fa-circle-question"></i> Centro de Ayuda
          </a>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Guía de Uso')}>
            <i className="fa-solid fa-book"></i> Guía de Uso
          </a>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Comunidad')}>
            <i className="fa-solid fa-users"></i> Comunidad
          </a>
        </div>

        {/* Legal */}
        <div style={styles.section}>
          <h4 style={styles.title}>Legal</h4>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Términos de Servicio')}>
            <i className="fa-solid fa-file-contract"></i> Términos de Servicio
          </a>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Política de Privacidad')}>
            <i className="fa-solid fa-shield"></i> Política de Privacidad
          </a>
          <a href="#" style={styles.link} onClick={(e) => handleWipClick(e, 'Cookies')}>
            <i className="fa-solid fa-cookie"></i> Cookies
          </a>
        </div>
      </div>

      <div style={styles.bottom}>
        © {currentYear} REDUCAX - Red Social Educativa. Todos los derechos reservados.
      </div>

      {/* WIP Alert */}
      <CustomAlert
        isOpen={showWipAlert}
        onClose={() => setShowWipAlert(false)}
        title="🚧 En Desarrollo"
        message={`La sección "${wipFeature}" está actualmente en desarrollo. ¡Próximamente disponible!`}
        type="info"
      />
    </footer>
  );
};

export default Footer;
