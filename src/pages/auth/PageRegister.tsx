import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { ROUTES } from '../../routes/routes';
import type { RegisterCredentials } from '../../types/auth.types';

const styles: React.CSSProperties = {
  background: '#fff',
  border: '4px solid #000',
  borderRadius: '12px',
  padding: '2rem',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const inputStyles: React.CSSProperties = {
  border: '2px solid #000',
  borderRadius: '8px',
  padding: '0.75rem',
  fontSize: '1rem',
  width: '100%',
};

const buttonStyles: React.CSSProperties = {
  background: '#000',
  color: '#fff',
  border: '2px solid #000',
  borderRadius: '8px',
  padding: '0.75rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
};

const labelStyles: React.CSSProperties = {
  color: '#000',
  fontSize: '0.875rem',
  fontWeight: '500',
  marginBottom: '0.25rem',
  display: 'block',
};

const errorStyles: React.CSSProperties = {
  background: '#f5f5f5',
  color: '#000',
  padding: '0.75rem',
  borderRadius: '8px',
  fontSize: '0.875rem',
  border: '2px solid #000',
};

const PageRegister: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthContext();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setValidationError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    if (credentials.password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await register(credentials);
      navigate(ROUTES.FEED, { replace: true });
    } catch {
      // Error ya manejado en useAuth
    }
  };

  const displayError = validationError || error;

  return (
    <form style={styles} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#000', fontWeight: 'bold', fontSize: '1.75rem' }}>
        CREAR CUENTA
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
        Únete a la comunidad educativa de Reducax
      </p>

      {displayError && <div style={errorStyles}>{displayError}</div>}

      <div>
        <label style={labelStyles}>Nombre de usuario</label>
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
        <label style={labelStyles}>Email</label>
        <input
          style={inputStyles}
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={credentials.email}
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

      <div>
        <label style={labelStyles}>Confirmar contraseña</label>
        <input
          style={inputStyles}
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setValidationError(null);
          }}
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
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      <p style={{ textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to={ROUTES.LOGIN} style={{ color: '#000', fontWeight: 'bold' }}>
          Inicia sesión
        </Link>
      </p>
    </form>
  );
};

export default PageRegister;
