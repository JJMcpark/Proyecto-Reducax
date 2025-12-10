import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuthContext } from '../context/AuthContext';
import { postStorage, bookmarkStorage, StoredPost, StoredComment } from '../services/storageService';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { user } = useAuthContext();

  const [post, setPost] = useState<StoredPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<StoredComment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      const allPosts = postStorage.getAll();
      const foundPost = allPosts.find(p => p.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        setLikesCount(foundPost.likes?.length || 0);
        setIsLiked(user ? foundPost.likes?.includes(user.id) ?? false : false);
        setIsBookmarked(user ? bookmarkStorage.isBookmarked(user.id, id) : false);
        setComments(foundPost.comments || []);
      }
      setLoading(false);
    }
  }, [id, user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = () => {
    if (!post || !user) return;
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    postStorage.toggleLike(post.id, user.id);
  };

  const handleBookmark = () => {
    if (!post || !user) return;
    bookmarkStorage.toggle(user.id, post.id);
    setIsBookmarked(!isBookmarked);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !user || !post) return;
    
    const addedComment = postStorage.addComment(post.id, user.id, newComment.trim());
    
    if (addedComment) {
      setComments(prev => [...prev, addedComment]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Post de REDUCAX', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: colors.textPrimary
      }}>
        <p>Cargando publicación...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        color: colors.textPrimary,
        gap: '1rem'
      }}>
        <i className="fa-solid fa-exclamation-triangle" style={{ fontSize: '3rem', color: colors.textMuted }}></i>
        <h2>Post no encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: colors.accent,
            color: colors.background,
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'transparent',
          border: `2px solid ${colors.border}`,
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          color: colors.textPrimary,
          marginBottom: '1.5rem',
          transition: 'all 0.2s ease'
        }}
      >
        <i className="fa-solid fa-arrow-left"></i>
        Volver
      </button>

      {/* Post Card */}
      <div style={{
        background: colors.cardBackground,
        border: `2px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: colors.accent,
            color: colors.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            border: `2px solid ${colors.border}`
          }}>
            {post.authorName?.charAt(0).toUpperCase() || post.authorId?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', color: colors.textPrimary }}>
              {post.authorName || 'Usuario'}
            </div>
            <div style={{ fontSize: '0.875rem', color: colors.textMuted }}>
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {/* Subject Tag */}
        {post.subject && (
          <span style={{
            display: 'inline-block',
            background: colors.accent,
            color: colors.background,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {post.subject}
          </span>
        )}

        {/* Content */}
        <p style={{
          fontSize: '1.125rem',
          lineHeight: 1.6,
          color: colors.textPrimary,
          marginBottom: '1.5rem',
          whiteSpace: 'pre-wrap'
        }}>
          {post.content}
        </p>

        {/* Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isLiked ? '#dc2626' : colors.textMuted,
                fontSize: '1rem',
                transition: 'all 0.2s ease'
              }}
            >
              <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
              {likesCount}
            </button>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: colors.textMuted
            }}>
              <i className="fa-regular fa-comment"></i>
              {comments.length}
            </span>
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: colors.textMuted
              }}
            >
              <i className="fa-solid fa-share"></i>
            </button>
          </div>
          <button
            onClick={handleBookmark}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isBookmarked ? colors.accent : colors.textMuted,
              fontSize: '1.25rem',
              transition: 'all 0.2s ease'
            }}
          >
            <i className={isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}></i>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div style={{
        background: colors.cardBackground,
        border: `2px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '1.5rem'
      }}>
        <h3 style={{
          color: colors.textPrimary,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <i className="fa-regular fa-comment"></i>
          Comentarios ({comments.length})
        </h3>

        {/* Add Comment */}
        {user && (
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: colors.accent,
              color: colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  background: colors.backgroundSecondary,
                  color: colors.textPrimary,
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                style={{
                  background: newComment.trim() ? colors.accent : colors.textMuted,
                  color: colors.background,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s ease'
                }}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        {comments.length === 0 ? (
          <p style={{ color: colors.textMuted, textAlign: 'center', padding: '2rem' }}>
            Sé el primero en comentar
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: colors.backgroundSecondary,
                  borderRadius: '8px'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: colors.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: colors.textPrimary,
                  flexShrink: 0
                }}>
                  U
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.75rem',
                    color: colors.textMuted,
                    marginBottom: '0.25rem'
                  }}>
                    {formatDate(comment.createdAt)}
                  </div>
                  <p style={{
                    margin: 0,
                    color: colors.textPrimary,
                    fontSize: '0.875rem'
                  }}>
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
