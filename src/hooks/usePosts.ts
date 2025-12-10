import { useState, useEffect, useCallback } from 'react';
import { postStorage, userStorage, bookmarkStorage, type StoredPost, type StoredComment } from '../services/storageService';
import type { Post, UserRole } from '../types';

/**
 * Hook para gestionar publicaciones del feed
 * Encapsula toda la lógica de CRUD, likes, comentarios y bookmarks
 */
export function usePosts(currentUserId: string | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapear StoredPost a Post con datos del autor
  const mapStoredPostToPost = useCallback((storedPost: StoredPost, userId: string): Post => {
    const author = userStorage.getById(storedPost.authorId);
    return {
      id: storedPost.id,
      author: {
        id: storedPost.authorId,
        name: author?.username || 'Usuario Desconocido',
        username: author?.username || 'unknown',
        avatar: author?.avatar,
        role: (author?.role || 'ESTUDIANTE') as UserRole,
        institution: author?.institution || 'Sin institución',
      },
      content: storedPost.content,
      subject: storedPost.subject,
      attachments: storedPost.attachments,
      likes: storedPost.likes.length,
      comments: storedPost.comments.length,
      shares: storedPost.shares,
      isLiked: storedPost.likes.includes(userId),
      isBookmarked: bookmarkStorage.isBookmarked(userId, storedPost.id),
      createdAt: storedPost.createdAt,
      commentsList: storedPost.comments,
    };
  }, []);

  // Cargar posts
  const loadPosts = useCallback(() => {
    if (!currentUserId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const storedPosts = postStorage.getAll();
      const mappedPosts = storedPosts.map(p => mapStoredPostToPost(p, currentUserId));
      setPosts(mappedPosts);
    } catch (err) {
      setError('Error al cargar publicaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId, mapStoredPostToPost]);

  // Cargar al montar o cambiar usuario
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Crear nuevo post
  const createPost = useCallback((content: string, subject?: string) => {
    if (!currentUserId || !content.trim()) return null;

    try {
      const createdPost = postStorage.create({
        authorId: currentUserId,
        content: content.trim(),
        subject: subject?.trim() || undefined,
      });

      const newPost = mapStoredPostToPost(createdPost, currentUserId);
      setPosts(prev => [newPost, ...prev]);
      return newPost;
    } catch (err) {
      setError('Error al crear publicación');
      console.error(err);
      return null;
    }
  }, [currentUserId, mapStoredPostToPost]);

  // Toggle like
  const toggleLike = useCallback((postId: string) => {
    if (!currentUserId) return;

    const updatedPost = postStorage.toggleLike(postId, currentUserId);
    if (updatedPost) {
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? {
              ...p,
              likes: updatedPost.likes.length,
              isLiked: updatedPost.likes.includes(currentUserId),
            }
          : p
      ));
    }
  }, [currentUserId]);

  // Eliminar post
  const deletePost = useCallback((postId: string) => {
    const success = postStorage.delete(postId);
    if (success) {
      setPosts(prev => prev.filter(p => p.id !== postId));
    }
    return success;
  }, []);

  // Agregar comentario
  const addComment = useCallback((postId: string, content: string): StoredComment | null => {
    if (!currentUserId || !content.trim()) return null;
    
    const comment = postStorage.addComment(postId, currentUserId, content.trim());
    if (comment) {
      setPosts(prev => prev.map(p =>
        p.id === postId
          ? {
              ...p,
              comments: p.comments + 1,
              commentsList: [...(p.commentsList || []), comment],
            }
          : p
      ));
      return comment;
    }
    return null;
  }, [currentUserId]);

  // Toggle bookmark
  const toggleBookmark = useCallback((postId: string): boolean => {
    if (!currentUserId) return false;
    
    const isBookmarked = bookmarkStorage.toggle(currentUserId, postId);
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, isBookmarked }
        : p
    ));
    return isBookmarked;
  }, [currentUserId]);

  // Obtener posts guardados
  const getBookmarkedPosts = useCallback((): Post[] => {
    if (!currentUserId) return [];
    const storedPosts = bookmarkStorage.getBookmarkedPosts(currentUserId);
    return storedPosts.map(p => mapStoredPostToPost(p, currentUserId));
  }, [currentUserId, mapStoredPostToPost]);

  return {
    posts,
    loading,
    error,
    loadPosts,
    createPost,
    toggleLike,
    deletePost,
    addComment,
    toggleBookmark,
    getBookmarkedPosts,
  };
}
