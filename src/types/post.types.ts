/**
 * Tipos de Publicaciones (Posts)
 * @module types/post
 */

import type { UserRole } from './user.types';

/**
 * Autor de una publicación
 */
export interface PostAuthor {
  /** ID del autor */
  id?: string;
  /** Nombre completo del autor */
  name: string;
  /** Nombre de usuario */
  username: string;
  /** URL del avatar */
  avatar?: string;
  /** Rol del autor */
  role: UserRole;
  /** Institución del autor */
  institution?: string;
}

/**
 * Archivo adjunto a una publicación
 */
export interface PostAttachment {
  /** Tipo de adjunto */
  type: 'image' | 'document' | 'link';
  /** URL del recurso */
  url: string;
  /** Nombre del archivo */
  name?: string;
}

/**
 * Comentario en una publicación
 */
export interface PostComment {
  /** ID único del comentario */
  id: string;
  /** ID del autor del comentario */
  authorId: string;
  /** Contenido del comentario */
  content: string;
  /** Fecha de creación */
  createdAt: string;
}

/**
 * Representa una publicación en el feed
 */
export interface Post {
  /** Identificador único */
  id: string;
  /** Información del autor */
  author: PostAuthor;
  /** Contenido de texto de la publicación */
  content: string;
  /** Materia o tema relacionado */
  subject?: string;
  /** Archivos adjuntos */
  attachments?: PostAttachment[];
  /** Cantidad de likes */
  likes: number;
  /** Cantidad de comentarios */
  comments: number;
  /** Cantidad de veces compartido */
  shares: number;
  /** Si el usuario actual dio like */
  isLiked?: boolean;
  /** Si el usuario actual guardó la publicación */
  isBookmarked?: boolean;
  /** Fecha de creación */
  createdAt: string;
}

/**
 * Datos para crear una nueva publicación
 */
export interface CreatePostData {
  /** Contenido de la publicación */
  content: string;
  /** Materia relacionada */
  subject?: string;
  /** Archivos adjuntos */
  attachments?: PostAttachment[];
}
