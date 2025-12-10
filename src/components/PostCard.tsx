import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Post, PostComment } from '../types';
import { useTheme } from '../context/ThemeContext';
import { userStorage } from '../services/storageService';

// Props del componente
interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, content: string) => void;
  onBookmark?: (postId: string) => void;
  showFullComments?: boolean;
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

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onBookmark, showFullComments = false }) => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);
  const [showComments, setShowComments] = useState(showFullComments);
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState<PostComment[]>(post.commentsList || []);
  const [commentsCount, setCommentsCount] = useState(post.comments);

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
    commentsSection: {
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: `1px solid ${colors.border}`,
    },
    commentForm: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    commentInput: {
      flex: 1,
      padding: '0.5rem 0.75rem',
      borderRadius: '20px',
      border: `1px solid ${colors.border}`,
      background: colors.backgroundSecondary,
      color: colors.textPrimary,
      fontSize: '0.875rem',
      outline: 'none',
    },
    commentButton: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      border: 'none',
      background: colors.accent,
      color: colors.background,
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    commentItem: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    },
    commentAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: colors.accent,
      color: colors.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      flexShrink: 0,
    },
    commentContent: {
      flex: 1,
      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      padding: '0.5rem 0.75rem',
      borderRadius: '12px',
    },
    commentAuthor: {
      fontWeight: '600',
      fontSize: '0.8125rem',
      color: colors.textPrimary,
    },
    commentText: {
      fontSize: '0.8125rem',
      color: colors.textPrimary,
      marginTop: '0.125rem',
    },
    commentTime: {
      fontSize: '0.6875rem',
      color: colors.textSecondary,
      marginTop: '0.25rem',
    },
  };

  // Sincronizar con props cuando cambien
  React.useEffect(() => {
    setIsLiked(post.isLiked);
    setLikesCount(post.likes);
    setIsBookmarked(post.isBookmarked);
    setLocalComments(post.commentsList || []);
    setCommentsCount(post.comments);
  }, [post.isLiked, post.likes, post.isBookmarked, post.commentsList, post.comments]);

  const handleLike = () => {
    if (onLike) {
      onLike(post.id);
    }
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark(post.id);
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !onComment) return;
    
    onComment(post.id, newComment.trim());
    
    // Agregar comentario localmente para feedback inmediato
    const tempComment: PostComment = {
      id: `temp-${Date.now()}`,
      authorId: 'current',
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    setLocalComments(prev => [...prev, tempComment]);
    setCommentsCount(prev => prev + 1);
    setNewComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const getAuthorName = (authorId: string): string => {
    const author = userStorage.getById(authorId);
    return author?.username || 'Usuario';
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

  const handleViewPost = () => {
    navigate(`/post/${post.id}`);
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
      <div style={styles.content} onClick={handleViewPost} role="button" tabIndex={0}>
        {formatContent(post.content)}
      </div>

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
            style={{
              ...styles.actionButton,
              color: showComments ? colors.accent : colors.textSecondary,
            }}
            title="Comentar"
            onClick={() => setShowComments(!showComments)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <i className="fa-regular fa-comment"></i> {commentsCount}
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

      {/* Comments Section */}
      {showComments && (
        <div style={styles.commentsSection}>
          {/* Comment Form */}
          <div style={styles.commentForm}>
            <input
              type="text"
              style={styles.commentInput}
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              style={{
                ...styles.commentButton,
                opacity: newComment.trim() ? 1 : 0.5,
              }}
              onClick={handleCommentSubmit}
              disabled={!newComment.trim()}
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>

          {/* Comments List */}
          {localComments.length > 0 && (
            <div>
              {localComments.slice(-5).map((comment) => (
                <div key={comment.id} style={styles.commentItem}>
                  <div style={styles.commentAvatar}>
                    {getAuthorName(comment.authorId).charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.commentContent}>
                    <div style={styles.commentAuthor}>
                      {getAuthorName(comment.authorId)}
                    </div>
                    <div style={styles.commentText}>{comment.content}</div>
                    <div style={styles.commentTime}>{formatTimeAgo(comment.createdAt)}</div>
                  </div>
                </div>
              ))}
              {localComments.length > 5 && (
                <button
                  style={{
                    ...styles.actionButton,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                  }}
                  onClick={handleViewPost}
                >
                  Ver todos los {localComments.length} comentarios
                </button>
              )}
            </div>
          )}

          {localComments.length === 0 && (
            <p style={{ textAlign: 'center', color: colors.textSecondary, fontSize: '0.875rem' }}>
              Sé el primero en comentar
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
