import React, { useState } from 'react';
import { authService } from '../../services/authService';

// Estilos en blanco y negro
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  } as React.CSSProperties,
  header: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  avatar: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '3rem',
    margin: '0 auto 1rem',
    border: '4px solid #000',
  } as React.CSSProperties,
  name: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '0.25rem',
  } as React.CSSProperties,
  username: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '0.5rem',
  } as React.CSSProperties,
  roleBadge: {
    display: 'inline-block',
    background: '#000',
    color: '#fff',
    padding: '0.375rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '1rem',
  } as React.CSSProperties,
  institution: {
    fontSize: '0.9375rem',
    color: '#666',
    marginBottom: '1rem',
  } as React.CSSProperties,
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,
  statItem: {
    textAlign: 'center' as const,
  } as React.CSSProperties,
  statNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
  } as React.CSSProperties,
  statLabel: {
    fontSize: '0.8125rem',
    color: '#666',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1.5rem',
  } as React.CSSProperties,
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  primaryButton: {
    background: '#000',
    color: '#fff',
    border: '2px solid #000',
  } as React.CSSProperties,
  secondaryButton: {
    background: '#fff',
    color: '#000',
    border: '2px solid #000',
  } as React.CSSProperties,
  tabs: {
    display: 'flex',
    borderBottom: '2px solid #000',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  tab: {
    padding: '1rem 1.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9375rem',
    fontWeight: '500',
    color: '#666',
    transition: 'all 0.2s ease',
    borderBottom: '3px solid transparent',
    marginBottom: '-2px',
  } as React.CSSProperties,
  tabActive: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomColor: '#000',
  } as React.CSSProperties,
  card: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  cardTitle: {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,
  formGroup: {
    marginBottom: '1rem',
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.375rem',
    color: '#000',
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '0.9375rem',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #000',
    borderRadius: '8px',
    fontSize: '0.9375rem',
    minHeight: '100px',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#666',
  } as React.CSSProperties,
};

type TabType = 'posts' | 'saved' | 'about' | 'settings';

const PagePerfil: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const user = authService.getUser();

  // Datos de ejemplo del perfil
  const profileData = {
    name: user?.username || 'Usuario',
    username: user?.username || 'usuario',
    email: user?.email || 'usuario@email.com',
    role: user?.role || 'ESTUDIANTE',
    institution: user?.institution || 'Universidad Nacional',
    bio: 'Estudiante apasionado por la tecnología y el aprendizaje continuo. Me encanta compartir conocimiento y colaborar en proyectos educativos.',
    stats: {
      posts: 45,
      followers: 128,
      following: 89,
      savedPosts: 32,
    },
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'DOCENTE':
        return '👨‍🏫 Docente';
      case 'ADMINISTRADOR':
        return '🛡️ Administrador';
      default:
        return '📚 Estudiante';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontWeight: 'bold', color: '#000', marginBottom: '0.5rem' }}>
              Mis Publicaciones
            </h3>
            <p>Aquí aparecerán tus publicaciones en el feed educativo.</p>
          </div>
        );
      case 'saved':
        return (
          <div style={styles.emptyState}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔖</div>
            <h3 style={{ fontWeight: 'bold', color: '#000', marginBottom: '0.5rem' }}>
              Publicaciones Guardadas
            </h3>
            <p>Las publicaciones que guardes aparecerán aquí para consultarlas después.</p>
          </div>
        );
      case 'about':
        return (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📋 Información Personal</h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Biografía:</strong>
              <p style={{ color: '#666', marginTop: '0.25rem' }}>{profileData.bio}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Institución:</strong>
              <p style={{ color: '#666', marginTop: '0.25rem' }}>{profileData.institution}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Correo electrónico:</strong>
              <p style={{ color: '#666', marginTop: '0.25rem' }}>{profileData.email}</p>
            </div>
            <div>
              <strong>Rol:</strong>
              <p style={{ color: '#666', marginTop: '0.25rem' }}>{getRoleLabel(profileData.role)}</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>⚙️ Editar Perfil</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre de usuario</label>
              <input style={styles.input} type="text" defaultValue={profileData.username} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Correo electrónico</label>
              <input style={styles.input} type="email" defaultValue={profileData.email} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Institución</label>
              <input style={styles.input} type="text" defaultValue={profileData.institution} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Biografía</label>
              <textarea style={styles.textarea} defaultValue={profileData.bio} />
            </div>
            <button style={{ ...styles.button, ...styles.primaryButton }}>
              Guardar cambios
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header del Perfil */}
      <div style={styles.header}>
        <div style={styles.avatar}>{profileData.name.charAt(0).toUpperCase()}</div>
        <h1 style={styles.name}>{profileData.name}</h1>
        <p style={styles.username}>@{profileData.username}</p>
        <div style={styles.roleBadge}>{getRoleLabel(profileData.role)}</div>
        <p style={styles.institution}>🏫 {profileData.institution}</p>

        {/* Estadísticas */}
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{profileData.stats.posts}</div>
            <div style={styles.statLabel}>Publicaciones</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{profileData.stats.followers}</div>
            <div style={styles.statLabel}>Seguidores</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{profileData.stats.following}</div>
            <div style={styles.statLabel}>Siguiendo</div>
          </div>
        </div>

        {/* Acciones */}
        <div style={styles.actions}>
          <button style={{ ...styles.button, ...styles.primaryButton }}>✏️ Editar perfil</button>
          <button style={{ ...styles.button, ...styles.secondaryButton }}>📤 Compartir</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {[
          { key: 'posts', label: '📝 Publicaciones' },
          { key: 'saved', label: '🔖 Guardados' },
          { key: 'about', label: '📋 Información' },
          { key: 'settings', label: '⚙️ Configuración' },
        ].map((tab) => (
          <button
            key={tab.key}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(tab.key as TabType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de la Tab */}
      {renderTabContent()}
    </div>
  );
};

export default PagePerfil;
