import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const styles = {
  container: {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  errorCode: {
    fontSize: '8rem',
    fontWeight: '900',
    color: '#000',
    lineHeight: 1,
    marginBottom: '1rem',
  } as React.CSSProperties,
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '1rem',
  } as React.CSSProperties,
  description: {
    fontSize: '1rem',
    color: '#666',
    maxWidth: '400px',
    marginBottom: '2rem',
    lineHeight: 1.6,
  } as React.CSSProperties,
  button: {
    display: 'inline-block',
    background: '#000',
    color: '#fff',
    padding: '0.875rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    border: '2px solid #000',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  icon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
};

const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>📚</div>
      <h1 style={styles.errorCode}>404</h1>
      <h2 style={styles.title}>Página no encontrada</h2>
      <p style={styles.description}>
        Lo sentimos, la página que buscas no existe o ha sido movida. 
        ¿Por qué no vuelves al feed educativo?
      </p>
      <Link to={ROUTES.FEED} style={styles.button}>
        Volver al Feed
      </Link>
    </div>
  );
};

export default NotFound;
