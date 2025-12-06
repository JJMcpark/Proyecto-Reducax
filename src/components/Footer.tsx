import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';

const styles = {
  footer: {
    background: '#000',
    color: '#fff',
    padding: '2rem 1rem',
    marginTop: 'auto',
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
    color: '#fff',
  } as React.CSSProperties,
  description: {
    fontSize: '0.875rem',
    color: '#ccc',
    lineHeight: '1.6',
  } as React.CSSProperties,
  title: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#fff',
  } as React.CSSProperties,
  link: {
    display: 'block',
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    transition: 'color 0.2s ease',
  } as React.CSSProperties,
  bottom: {
    borderTop: '1px solid #333',
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center' as const,
    fontSize: '0.8125rem',
    color: '#888',
  } as React.CSSProperties,
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Brand */}
        <div style={styles.section}>
          <div style={styles.brand}>
            <FaBookReader style={{ fontSize: '1.5rem' }} />
            <span style={styles.brandText}>Reducax</span>
          </div>
          <p style={styles.description}>
            La red social educativa que conecta estudiantes, docentes e instituciones para un aprendizaje colaborativo.
          </p>
        </div>

        {/* Enlaces */}
        <div style={styles.section}>
          <h4 style={styles.title}>Navegación</h4>
          <Link to="/feed" style={styles.link}>Feed</Link>
          <Link to="/feed/profile" style={styles.link}>Mi Perfil</Link>
          <Link to="/feed/messages" style={styles.link}>Mensajes</Link>
        </div>

        {/* Recursos */}
        <div style={styles.section}>
          <h4 style={styles.title}>Recursos</h4>
          <a href="#" style={styles.link}>Centro de Ayuda</a>
          <a href="#" style={styles.link}>Guía de Uso</a>
          <a href="#" style={styles.link}>Comunidad</a>
        </div>

        {/* Legal */}
        <div style={styles.section}>
          <h4 style={styles.title}>Legal</h4>
          <a href="#" style={styles.link}>Términos de Servicio</a>
          <a href="#" style={styles.link}>Política de Privacidad</a>
          <a href="#" style={styles.link}>Cookies</a>
        </div>
      </div>

      <div style={styles.bottom}>
        © {currentYear} Reducax - Red Social Educativa. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
