import React, { useState } from 'react';
import type { Post } from '../types';
import { useTheme } from '../context/ThemeContext';

// Props del componente
interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

// Función para formatear el tiempo relativo
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `hace ${diffMins}m`;
  if (diffHours < 24) return `hace ${diffHours}h`;
  if (diffDays < 7) return `hace ${diffDays}d`;
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
};

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const { colors, theme } = useTheme();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  // Estilos dinámicos con tema
  const styles: Record<string, React.CSSProperties> = {
    card: {
      background: colors.cardBackground,
      border: `1px solid ${colors.border}`,
      borderRadius: '16px',
      padding: '1.25rem',
      marginBottom: '0.5rem',
      transition: 'all 0.2s ease',
      animation: 'fadeInUp 0.3s ease-out',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: colors.accent,
      color: colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      flexShrink: 0,
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontWeight: 'bold',
      fontSize: '0.9375rem',
      color: colors.textPrimary,
      marginBottom: '0.125rem',
    },
    authorMeta: {
      fontSize: '0.8125rem',
      color: colors.textSecondary,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap' as const,
    },
    roleBadge: {
      background: colors.accent,
      color: colors.background,
      fontSize: '0.6875rem',
      padding: '0.125rem 0.5rem',
      borderRadius: '10px',
      fontWeight: '500',
    },
    moreButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '0.25rem 0.5rem',
      color: colors.textSecondary,
      borderRadius: '50%',
      transition: 'all 0.2s ease',
    },
    content: {
      fontSize: '0.9375rem',
      lineHeight: '1.6',
      color: colors.textPrimary,
      marginBottom: '1rem',
      whiteSpace: 'pre-wrap' as const,
    },
    hashtag: {
      color: colors.accent,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    subjectTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      border: `1px solid ${colors.border}`,
      borderRadius: '15px',
      padding: '0.25rem 0.75rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginBottom: '1rem',
      color: colors.textSecondary,
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '0.75rem',
      borderTop: `1px solid ${colors.border}`,
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      color: colors.textSecondary,
      transition: 'all 0.2s ease',
    },
    bookmarkButton: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.125rem',
      padding: '0.5rem',
      color: colors.textSecondary,
      transition: 'all 0.2s ease',
      borderRadius: '50%',
    },
  };

  // Sincronizar con props cuando cambien
  React.useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likes);
  }, [post.isLiked, post.likes]);

  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    } else {
      // Fallback para compatibilidad
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getRoleLabel = (role: string): React.ReactNode => {
    switch (role) {
      case 'DOCENTE':
        return <><i className="fa-solid fa-chalkboard-user"></i> Docente</>;
      case 'ADMINISTRADOR':
        return <><i className="fa-solid fa-shield"></i> Admin</>;
      default:
        return <><i className="fa-solid fa-graduation-cap"></i> Estudiante</>;
    }
  };

  // Función para resaltar hashtags
  const formatContent = (content: string): React.ReactNode[] => {
    const parts = content.split(/(#\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} style={styles.hashtag}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.hoverBackground;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.cardBackground;
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.avatar}>{post.author.name.charAt(0)}</div>
        <div style={styles.authorInfo}>
          <div style={styles.authorName}>{post.author.name}</div>
          <div style={styles.authorMeta}>
            <span>@{post.author.username}</span>
            <span>•</span>
            <span>{formatTimeAgo(post.createdAt)}</span>
            <span style={styles.roleBadge}>{getRoleLabel(post.author.role)}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: colors.textSecondary, marginTop: '0.125rem' }}>
            {post.author.institution}
          </div>
        </div>
        <button 
          style={styles.moreButton} 
          title="Más opciones"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.hoverBackground;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      {/* Subject Tag */}
      {post.subject && (
        <div style={styles.subjectTag}>
          <i className="fa-solid fa-book"></i> {post.subject}
        </div>
      )}

      {/* Content */}
      <div style={styles.content}>{formatContent(post.content)}</div>

      {/* Actions */}
      <div style={styles.actions}>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            style={{
              ...styles.actionButton,
              color: isLiked ? colors.accent : colors.textSecondary,
              fontWeight: isLiked ? 'bold' : 'normal',
            }}
            onClick={handleLike}
            title="Me gusta"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i> {likesCount}
          </button>
          <button 
            style={styles.actionButton} 
            title="Comentar"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <i className="fa-regular fa-comment"></i> {post.comments}
          </button>
          <button 
            style={styles.actionButton} 
            title="Compartir"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <i className="fa-solid fa-retweet"></i> {post.shares}
          </button>
        </div>
        <button
          style={{
            ...styles.bookmarkButton,
            color: isBookmarked ? colors.accent : colors.textSecondary,
          }}
          onClick={handleBookmark}
          title={isBookmarked ? 'Quitar de guardados' : 'Guardar'}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <i className={isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
