import { useState, useEffect, useCallback } from 'react';
import { postStorage, userStorage, type StoredPost } from '../services/storageService';
import type { Post, UserRole } from '../types';

/**
 * Hook para gestionar publicaciones del feed
 * Encapsula toda la lógica de CRUD y likes
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
      isBookmarked: false,
      createdAt: storedPost.createdAt,
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

  // Agregar comentario (placeholder - requiere implementar en storageService)
  const addComment = useCallback((_postId: string, _content: string) => {
    if (!currentUserId) return false;
    // TODO: Implementar cuando se agregue addComment a storageService
    console.warn('addComment no implementado aún en storageService');
    return false;
  }, [currentUserId]);

  return {
    posts,
    loading,
    error,
    loadPosts,
    createPost,
    toggleLike,
    deletePost,
    addComment,
  };
}
