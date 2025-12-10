import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routes';
import type { LoginCredentials } from '../../types';

const styles: React.CSSProperties = {
  background: '#000',
  borderRadius: '12px',
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  border: '2px solid #fff',
};

const inputStyles: React.CSSProperties = {
  background: '#fff',
  border: '2px solid #000',
  borderRadius: '8px',
  padding: '0.75rem',
  fontSize: '1rem',
  width: '100%',
};

const buttonStyles: React.CSSProperties = {
  background: '#fff',
  color: '#000',
  border: '2px solid #000',
  borderRadius: '8px',
  padding: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
};

const labelStyles: React.CSSProperties = {
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: '500',
  marginBottom: '0.25rem',
  display: 'block',
};

const errorStyles: React.CSSProperties = {
  background: '#fff',
  color: '#000',
  padding: '0.75rem',
  borderRadius: '8px',
  fontSize: '0.875rem',
  border: '2px solid #000',
};

const PageLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthContext();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate(ROUTES.FEED, { replace: true });
    } catch {
      // Error ya manejado en useAuth
    }
  };

  return (
    <form style={styles} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#fff', fontWeight: 'bold', fontSize: '1.75rem' }}>
        INICIAR SESIÓN
      </h2>
      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        Bienvenido a Reducax - Red Social Educativa
      </p>

      {error && <div style={errorStyles}>{error}</div>}

      <div>
        <label style={labelStyles}>Usuario</label>
        <input
          style={inputStyles}
          type="text"
          name="username"
          placeholder="Tu nombre de usuario"
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label style={labelStyles}>Contraseña</label>
        <input
          style={inputStyles}
          type="password"
          name="password"
          placeholder="••••••••"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        style={{
          ...buttonStyles,
          opacity: loading ? 0.7 : 1,
        }}
        type="submit"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '0.875rem' }}>
        ¿No tienes cuenta?{' '}
        <Link to={ROUTES.REGISTER} style={{ color: '#fff', fontWeight: 'bold' }}>
          Regístrate
        </Link>
      </p>
    </form>
  );
};

export default PageLogin;
