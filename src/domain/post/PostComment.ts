/**
 * Clase de Dominio: Comentario de Publicación
 * Representa un comentario en una publicación
 */

export class PostComment {
  readonly id: string;
  readonly authorId: string;
  readonly authorName: string;
  private _content: string;
  readonly createdAt: Date;
  private _isEdited: boolean;

  constructor(data: {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt?: string;
    isEdited?: boolean;
  }) {
    this.id = data.id;
    this.authorId = data.authorId;
    this.authorName = data.authorName;
    this._content = data.content;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this._isEdited = data.isEdited ?? false;
  }

  // ==================== GETTERS ====================
  get content(): string {
    return this._content;
  }

  get isEdited(): boolean {
    return this._isEdited;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Edita el contenido del comentario
   */
  edit(newContent: string): void {
    if (newContent.trim().length === 0) {
      throw new Error('El comentario no puede estar vacío');
    }
    this._content = newContent.trim();
    this._isEdited = true;
  }

  /**
   * Verifica si el usuario es el autor del comentario
   */
  isAuthor(userId: string): boolean {
    return this.authorId === userId;
  }

  /**
   * Valida que el comentario tenga contenido válido
   */
  isValid(): boolean {
    return this._content.trim().length > 0 && this._content.length <= 500;
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
   * Serializa el comentario para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      authorId: this.authorId,
      authorName: this.authorName,
      content: this._content,
      createdAt: this.createdAt.toISOString(),
      isEdited: this._isEdited,
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): PostComment {
    return new PostComment({
      id: json.id as string,
      authorId: json.authorId as string,
      authorName: json.authorName as string,
      content: json.content as string,
      createdAt: json.createdAt as string | undefined,
      isEdited: json.isEdited as boolean | undefined,
    });
  }
}
