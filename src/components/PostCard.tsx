import React, { useState } from 'react';

// Tipo para el post
interface PostProps {
  post: {
    id: string;
    author: {
      name: string;
      username: string;
      avatar?: string;
      role: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';
      institution: string;
    };
    content: string;
    subject?: string;
    attachments?: {
      type: 'image' | 'document' | 'link';
      url: string;
      name?: string;
    }[];
    likes: number;
    comments: number;
    shares: number;
    isLiked: boolean;
    isBookmarked: boolean;
    createdAt: string;
  };
}

// Estilos en blanco y negro
const styles = {
  card: {
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1rem',
    transition: 'box-shadow 0.2s ease',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    alignItems: 'flex-start',
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
    flexShrink: 0,
  } as React.CSSProperties,
  authorInfo: {
    flex: 1,
  } as React.CSSProperties,
  authorName: {
    fontWeight: 'bold',
    fontSize: '0.9375rem',
    color: '#000',
    marginBottom: '0.125rem',
  } as React.CSSProperties,
  authorMeta: {
    fontSize: '0.8125rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap' as const,
  } as React.CSSProperties,
  roleBadge: {
    background: '#000',
    color: '#fff',
    fontSize: '0.6875rem',
    padding: '0.125rem 0.5rem',
    borderRadius: '10px',
    fontWeight: '500',
  } as React.CSSProperties,
  moreButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '0.25rem',
    color: '#666',
  } as React.CSSProperties,
  content: {
    fontSize: '0.9375rem',
    lineHeight: '1.6',
    color: '#000',
    marginBottom: '1rem',
    whiteSpace: 'pre-wrap' as const,
  } as React.CSSProperties,
  hashtag: {
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
  } as React.CSSProperties,
  subjectTag: {
    display: 'inline-block',
    background: '#f0f0f0',
    border: '1px solid #000',
    borderRadius: '15px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginBottom: '1rem',
  } as React.CSSProperties,
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '0.75rem',
    borderTop: '1px solid #e0e0e0',
  } as React.CSSProperties,
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#666',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  actionButtonActive: {
    color: '#000',
    fontWeight: 'bold',
  } as React.CSSProperties,
  bookmarkButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.25rem',
    padding: '0.5rem',
    color: '#666',
    transition: 'color 0.2s ease',
  } as React.CSSProperties,
};

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

const PostCard: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'DOCENTE':
        return '👨‍🏫 Docente';
      case 'ADMINISTRADOR':
        return '🛡️ Admin';
      default:
        return '📚 Estudiante';
    }
  };

  return (
    <div style={styles.card}>
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
          <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.125rem' }}>
            {post.author.institution}
          </div>
        </div>
        <button style={styles.moreButton} title="Más opciones">
          ⋮
        </button>
      </div>

      {/* Subject Tag */}
      {post.subject && <div style={styles.subjectTag}>📖 {post.subject}</div>}

      {/* Content */}
      <div style={styles.content}>{formatContent(post.content)}</div>

      {/* Actions */}
      <div style={styles.actions}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              ...styles.actionButton,
              ...(isLiked ? styles.actionButtonActive : {}),
            }}
            onClick={handleLike}
            title="Me gusta"
          >
            {isLiked ? '❤️' : '🤍'} {likesCount}
          </button>
          <button style={styles.actionButton} title="Comentar">
            💬 {post.comments}
          </button>
          <button style={styles.actionButton} title="Compartir">
            🔄 {post.shares}
          </button>
        </div>
        <button
          style={{
            ...styles.bookmarkButton,
            color: isBookmarked ? '#000' : '#666',
          }}
          onClick={handleBookmark}
          title={isBookmarked ? 'Quitar de guardados' : 'Guardar'}
        >
          {isBookmarked ? '🔖' : '📑'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
