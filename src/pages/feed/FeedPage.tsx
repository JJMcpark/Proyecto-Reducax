import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { usePosts } from '../../hooks';
import { ROUTES } from '../../routes/routes';

// Estilos base
const styles = {
  container: {
    display: 'flex',
    gap: '1.5rem',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 1rem',
  } as React.CSSProperties,
  mainContent: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,
  sidebar: {
    width: '300px',
    flexShrink: 0,
    display: 'none',
  } as React.CSSProperties,
  sidebarVisible: {
    width: '300px',
    flexShrink: 0,
    display: 'block',
  } as React.CSSProperties,
  createPost: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  createPostHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#000',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    border: '2px solid #000',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    minHeight: '80px',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.75rem',
    fontSize: '1rem',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  } as React.CSSProperties,
  createPostActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  } as React.CSSProperties,
  iconButton: {
    background: 'transparent',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  publishButton: {
    background: '#000',
    color: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 1.5rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.875rem',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  feedHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#000',
    margin: 0,
  } as React.CSSProperties,
  filterButton: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  } as React.CSSProperties,
  sidebarCard: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1rem',
  } as React.CSSProperties,
  sidebarTitle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#000',
  } as React.CSSProperties,
  trendItem: {
    padding: '0.75rem 0',
    borderBottom: '1px solid #e0e0e0',
  } as React.CSSProperties,
  trendTag: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: '0.875rem',
  } as React.CSSProperties,
  trendCount: {
    fontSize: '0.75rem',
    color: '#666',
    marginTop: '0.25rem',
  } as React.CSSProperties,
};

const FeedPage: React.FC = () => {
  const { user } = useAuthContext();
  const { colors } = useTheme();
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostSubject, setNewPostSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Usar hook de posts
  const { posts, loading, createPost, toggleLike, loadPosts, addComment, toggleBookmark } = usePosts(user?.id);

  // Estilos dinámicos basados en el tema
  const themedStyles = {
    createPost: {
      background: colors.cardBackground,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '1.25rem',
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease',
    },
    avatar: {
      ...styles.avatar,
      background: colors.accent,
      color: colors.backgroundSecondary,
      border: `2px solid ${colors.border}`,
    },
    textarea: {
      ...styles.textarea,
      background: colors.backgroundSecondary,
      color: colors.textPrimary,
      border: `2px solid ${colors.border}`,
    },
    title: {
      ...styles.title,
      color: colors.textPrimary,
    },
    filterButton: {
      ...styles.filterButton,
      background: colors.cardBackground,
      border: `2px solid ${colors.border}`,
      color: colors.textPrimary,
    },
    iconButton: {
      ...styles.iconButton,
      border: `2px solid ${colors.border}`,
      color: colors.textPrimary,
    },
    publishButton: {
      ...styles.publishButton,
      background: colors.accent,
      color: colors.backgroundSecondary,
      border: `2px solid ${colors.accent}`,
    },
    sidebarCard: {
      ...styles.sidebarCard,
      background: colors.cardBackground,
      border: `2px solid ${colors.border}`,
    },
    sidebarTitle: {
      ...styles.sidebarTitle,
      color: colors.textPrimary,
    },
    trendTag: {
      ...styles.trendTag,
      color: colors.textPrimary,
    },
    trendCount: {
      ...styles.trendCount,
      color: colors.textMuted,
    },
    trendItem: {
      ...styles.trendItem,
      borderBottom: `1px solid ${colors.borderLight}`,
    },
    createPostActions: {
      ...styles.createPostActions,
      borderTop: `1px solid ${colors.borderLight}`,
    },
  };

  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !user) return;

    setIsSubmitting(true);
    createPost(newPostContent.trim(), newPostSubject.trim() || undefined);
    
    // Limpiar formulario
    setNewPostContent('');
    setNewPostSubject('');
    setIsSubmitting(false);
  };

  const handleLike = (postId: string) => {
    toggleLike(postId);
  };

  const handleComment = (postId: string, content: string) => {
    addComment(postId, content);
  };

  const handleBookmark = (postId: string) => {
    if (!user) return;
    toggleBookmark(postId);
  };

  // Trending topics educativos
  const trendingTopics = [
    { tag: '#AlgebraLineal', posts: 234 },
    { tag: '#ExámenesParciales', posts: 189 },
    { tag: '#ProgramaciónI', posts: 156 },
    { tag: '#FísicaII', posts: 98 },
    { tag: '#ProyectoFinal', posts: 87 },
  ];

  // Grupos de estudio sugeridos
  const studyGroups = [
    { id: '1', name: 'Álgebra Lineal - Grupo 101', members: 24, icon: 'fa-solid fa-square-root-variable', color: '#dc2626' },
    { id: '2', name: 'Estructura de Datos', members: 31, icon: 'fa-solid fa-laptop-code', color: '#2563eb' },
    { id: '3', name: 'Física II - Grupo de Apoyo', members: 18, icon: 'fa-solid fa-bolt', color: '#eab308' },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: colors.textPrimary }}>
        <p>Cargando publicaciones...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Contenido Principal */}
      <div style={styles.mainContent}>
        {/* Header del Feed */}
        <div style={styles.feedHeader}>
          <h1 style={themedStyles.title}>Feed Educativo</h1>
          <button style={themedStyles.filterButton} onClick={loadPosts}>
            <i className="fa-solid fa-rotate"></i> Actualizar
          </button>
        </div>

        {/* Crear Post */}
        <div style={themedStyles.createPost}>
          <div style={styles.createPostHeader}>
            <div style={themedStyles.avatar}>{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
            <span style={{ fontWeight: '500', color: colors.textPrimary }}>¿Qué quieres compartir, {user?.username}?</span>
          </div>
          <input
            type="text"
            style={{
              ...themedStyles.textarea,
              minHeight: 'auto',
              padding: '0.5rem 0.75rem',
              marginBottom: '0.5rem',
            }}
            placeholder="Materia o tema (opcional)"
            value={newPostSubject}
            onChange={(e) => setNewPostSubject(e.target.value)}
          />
          <textarea
            style={themedStyles.textarea}
            placeholder="Comparte una pregunta, material de estudio o recurso educativo..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <div style={themedStyles.createPostActions}>
            <div style={styles.actionButtons}>
              <button style={themedStyles.iconButton} title="Adjuntar imagen">
                <i className="fa-solid fa-image"></i> Imagen
              </button>
              <button style={themedStyles.iconButton} title="Adjuntar documento">
                <i className="fa-solid fa-file-lines"></i> Documento
              </button>
              <button style={themedStyles.iconButton} title="Agregar enlace">
                <i className="fa-solid fa-link"></i> Enlace
              </button>
            </div>
            <button
              style={{
                ...themedStyles.publishButton,
                opacity: newPostContent.trim() && !isSubmitting ? 1 : 0.5,
              }}
              onClick={handlePostSubmit}
              disabled={!newPostContent.trim() || isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>

        {/* Lista de Posts */}
        <div>
          {posts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: colors.cardBackground,
              border: `2px solid ${colors.border}`,
              borderRadius: '12px',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: colors.textPrimary }}>No hay publicaciones aún</h3>
              <p style={{ color: colors.textMuted }}>¡Sé el primero en compartir algo con la comunidad!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={handleLike}
                onComment={handleComment}
                onBookmark={handleBookmark}
              />
            ))
          )}
        </div>
      </div>

      {/* Sidebar Derecho - Solo visible en pantallas grandes */}
      <aside className="feed-sidebar" style={{
        ...styles.sidebarVisible,
        position: 'sticky',
        top: '72px',
        height: 'fit-content',
      }}>
        {/* Grupos de Estudio */}
        <div style={{
          ...themedStyles.sidebarCard,
          marginBottom: '1rem',
        }}>
          <h3 style={{
            ...themedStyles.sidebarTitle,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}>
            <i className="fa-solid fa-users" style={{ color: colors.accent }}></i>
            Grupos de Estudio
          </h3>
          {studyGroups.map((group) => (
            <div
              key={group.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 0',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <i className={group.icon} style={{ 
                color: group.color, 
                fontSize: '1rem',
                width: '20px',
                textAlign: 'center',
              }}></i>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 500, 
                  color: colors.textPrimary,
                  marginBottom: '0.125rem',
                }}>
                  {group.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: colors.textMuted }}>
                  {group.members} miembros
                </div>
              </div>
            </div>
          ))}
          <Link 
            to={ROUTES.GROUPS}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.625rem',
              marginTop: '0.75rem',
              background: colors.accent,
              color: colors.background,
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Ver todos los grupos →
          </Link>
        </div>

        {/* Instituciones */}
        <div style={{
          ...themedStyles.sidebarCard,
          marginBottom: '1rem',
        }}>
          <h3 style={{
            ...themedStyles.sidebarTitle,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}>
            <i className="fa-solid fa-building-columns" style={{ color: '#dc2626' }}></i>
            Instituciones
          </h3>
          <p style={{ fontSize: '0.8125rem', color: colors.textSecondary, marginBottom: '1rem', lineHeight: 1.5 }}>
            Descubre instituciones educativas, conecta con tu universidad y accede a recursos exclusivos.
          </p>
          <Link 
            to={ROUTES.INSTITUTIONS}
            style={{
              display: 'block',
              width: '100%',
              padding: '0.625rem',
              background: colors.accent,
              color: colors.background,
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Explorar instituciones →
          </Link>
        </div>

        {/* Tendencias Educativas */}
        <div style={themedStyles.sidebarCard}>
          <h3 style={{
            ...themedStyles.sidebarTitle,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}>
            <i className="fa-solid fa-chart-line" style={{ color: '#059669' }}></i>
            Tendencias
          </h3>
          {trendingTopics.slice(0, 4).map((topic, index) => (
            <div
              key={topic.tag}
              style={{
                padding: '0.5rem 0',
                borderBottom: index === 3 ? 'none' : `1px solid ${colors.border}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: colors.textPrimary }}>{topic.tag}</div>
              <div style={{ fontSize: '0.6875rem', color: colors.textMuted }}>{topic.posts} publicaciones</div>
            </div>
          ))}
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .feed-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default FeedPage;
