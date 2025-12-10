/**
 * Clase de Dominio: Notificación
 * Representa una notificación del sistema
 */

export type NotificationType = 
  | 'like'          // Alguien dio like
  | 'comment'       // Alguien comentó
  | 'follow'        // Alguien te siguió
  | 'mention'       // Alguien te mencionó
  | 'announcement'; // Anuncio del sistema

export class Notification {
  readonly id: string;
  readonly type: NotificationType;
  private _message: string;
  readonly createdAt: Date;
  private _isRead: boolean;
  readonly relatedId?: string;

  constructor(data: {
    id: string;
    type: NotificationType;
    message: string;
    createdAt?: string;
    isRead?: boolean;
    relatedId?: string;
  }) {
    this.id = data.id;
    this.type = data.type;
    this._message = data.message;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
    this._isRead = data.isRead ?? false;
    this.relatedId = data.relatedId;
  }

  // ==================== GETTERS ====================
  get message(): string {
    return this._message;
  }

  get isRead(): boolean {
    return this._isRead;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Marca la notificación como leída
   */
  markAsRead(): void {
    this._isRead = true;
  }

  /**
   * Verifica si es una notificación de interacción social
   */
  isSocialInteraction(): boolean {
    return ['like', 'comment', 'follow', 'mention'].includes(this.type);
  }

  /**
   * Verifica si es un anuncio del sistema
   */
  isSystemAnnouncement(): boolean {
    return this.type === 'announcement';
  }

  /**
   * Obtiene el icono correspondiente al tipo
   */
  getIcon(): string {
    const icons: Record<NotificationType, string> = {
      like: '❤️',
      comment: '💬',
      follow: '👤',
      mention: '@',
      announcement: '📢',
    };
    return icons[this.type];
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
   * Serializa la notificación para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      type: this.type,
      message: this._message,
      createdAt: this.createdAt.toISOString(),
      isRead: this._isRead,
      relatedId: this.relatedId,
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): Notification {
    return new Notification({
      id: json.id as string,
      type: json.type as NotificationType,
      message: json.message as string,
      createdAt: json.createdAt as string | undefined,
      isRead: json.isRead as boolean | undefined,
      relatedId: json.relatedId as string | undefined,
    });
  }
}
