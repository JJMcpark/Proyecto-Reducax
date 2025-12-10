import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { FaBookReader, FaUsers, FaGraduationCap, FaComments } from 'react-icons/fa';

const PageWelcome: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '2rem',
      }}
    >
      {/* Logo/Título principal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <FaBookReader style={{ fontSize: '4rem', color: '#000' }} />
      </div>
      
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: '900',
          color: '#000',
          marginBottom: '1rem',
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}
      >
        REDUCAX
      </h1>

      {/* Subtítulo */}
      <p
        style={{
          fontSize: '1.25rem',
          color: '#333',
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        La red social educativa que conecta estudiantes, docentes e instituciones
      </p>

      {/* Características */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '3rem',
          maxWidth: '800px',
        }}
      >
        <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
          <FaUsers style={{ fontSize: '2rem', color: '#000', marginBottom: '0.5rem' }} />
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Conecta con compañeros</p>
        </div>
        <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
          <FaGraduationCap style={{ fontSize: '2rem', color: '#000', marginBottom: '0.5rem' }} />
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Aprende colaborativamente</p>
        </div>
        <div style={{ textAlign: 'center', flex: '1', minWidth: '150px' }}>
          <FaComments style={{ fontSize: '2rem', color: '#000', marginBottom: '0.5rem' }} />
          <p style={{ color: '#666', fontSize: '0.875rem' }}>Comparte conocimiento</p>
        </div>
      </div>

      {/* Contenedor de botones */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Botón Login */}
        <Link to={ROUTES.LOGIN} style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: '#fff',
              color: '#000',
              border: '3px solid #000',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
          >
            Iniciar Sesión
          </button>
        </Link>

        {/* Botón Register */}
        <Link to={ROUTES.REGISTER} style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: '#000',
              color: '#fff',
              border: '3px solid #000',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '180px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#000';
            }}
          >
            Crear Cuenta
          </button>
        </Link>
      </div>

      {/* Decoración inferior */}
      <div
        style={{
          marginTop: '3rem',
          width: '100%',
          maxWidth: '300px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #000, transparent)',
        }}
      />
      
      <p style={{ marginTop: '1.5rem', color: '#999', fontSize: '0.75rem' }}>
        © 2024 Reducax - Red Social Educativa
      </p>
    </div>
  );
};

export default PageWelcome;
