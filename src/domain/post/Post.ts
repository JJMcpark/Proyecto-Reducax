/**
 * Clase de Dominio: Publicación
 * Representa una publicación en la red social educativa
 */

import type { UserRole } from '../user';

export interface PostAuthorData {
  name: string;
  username: string;
  avatar?: string;
  role: UserRole;
  institution?: string;
}

export interface PostAttachment {
  type: 'image' | 'document' | 'link';
  url: string;
  name?: string;
}

export class Post {
  readonly id: string;
  private _author: PostAuthorData;
  private _content: string;
  private _subject?: string;
  private _attachments: PostAttachment[];
  private _likes: number;
  private _comments: number;
  private _shares: number;
  private _isLiked: boolean;
  private _isBookmarked: boolean;
  readonly createdAt: Date;

  constructor(data: {
    id: string;
    author: PostAuthorData;
    content: string;
    subject?: string;
    attachments?: PostAttachment[];
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
    createdAt?: string;
  }) {
    this.id = data.id;
    this._author = data.author;
    this._content = data.content;
    this._subject = data.subject;
    this._attachments = data.attachments ?? [];
    this._likes = data.likes ?? 0;
    this._comments = data.comments ?? 0;
    this._shares = data.shares ?? 0;
    this._isLiked = data.isLiked ?? false;
    this._isBookmarked = data.isBookmarked ?? false;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }

  // ==================== GETTERS ====================
  get author(): PostAuthorData {
    return { ...this._author };
  }

  get content(): string {
    return this._content;
  }

  get subject(): string | undefined {
    return this._subject;
  }

  get attachments(): PostAttachment[] {
    return [...this._attachments];
  }

  get likes(): number {
    return this._likes;
  }

  get comments(): number {
    return this._comments;
  }

  get shares(): number {
    return this._shares;
  }

  get isLiked(): boolean {
    return this._isLiked;
  }

  get isBookmarked(): boolean {
    return this._isBookmarked;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Da like o quita like a la publicación
   */
  toggleLike(): void {
    if (this._isLiked) {
      this._likes = Math.max(0, this._likes - 1);
      this._isLiked = false;
    } else {
      this._likes += 1;
      this._isLiked = true;
    }
  }

  /**
   * Guarda o quita de guardados
   */
  toggleBookmark(): void {
    this._isBookmarked = !this._isBookmarked;
  }

  /**
   * Incrementa el contador de comentarios
   */
  addComment(): void {
    this._comments += 1;
  }

  /**
   * Incrementa el contador de compartidos
   */
  share(): void {
    this._shares += 1;
  }

  /**
   * Verifica si la publicación tiene adjuntos
   */
  hasAttachments(): boolean {
    return this._attachments.length > 0;
  }

  /**
   * Obtiene solo las imágenes adjuntas
   */
  getImages(): PostAttachment[] {
    return this._attachments.filter((a) => a.type === 'image');
  }

  /**
   * Obtiene solo los documentos adjuntos
   */
  getDocuments(): PostAttachment[] {
    return this._attachments.filter((a) => a.type === 'document');
  }

  /**
   * Verifica si es del autor especificado
   */
  isAuthor(username: string): boolean {
    return this._author.username === username;
  }

  /**
   * Obtiene el tiempo relativo desde la creación
   */
  getRelativeTime(): string {
    const now = new Date();
    const diffMs = now.getTime() - this.createdAt.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return this.createdAt.toLocaleDateString('es-ES');
  }

  /**
   * Serializa la publicación para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      author: this._author,
      content: this._content,
      subject: this._subject,
      attachments: this._attachments,
      likes: this._likes,
      comments: this._comments,
      shares: this._shares,
      isLiked: this._isLiked,
      isBookmarked: this._isBookmarked,
      createdAt: this.createdAt.toISOString(),
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): Post {
    return new Post({
      id: json.id as string,
      author: json.author as PostAuthorData,
      content: json.content as string,
      subject: json.subject as string | undefined,
      attachments: json.attachments as PostAttachment[] | undefined,
      likes: json.likes as number | undefined,
      comments: json.comments as number | undefined,
      shares: json.shares as number | undefined,
      isLiked: json.isLiked as boolean | undefined,
      isBookmarked: json.isBookmarked as boolean | undefined,
      createdAt: json.createdAt as string | undefined,
    });
  }
}
