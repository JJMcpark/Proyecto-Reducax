/**
 * Clase de Dominio: Mensaje
 * Representa un mensaje en una conversación
 */

export class Message {
  readonly id: string;
  private _content: string;
  readonly timestamp: Date;
  readonly isMine: boolean;
  private _isRead: boolean;

  constructor(data: {
    id: string;
    content: string;
    timestamp?: string;
    isMine: boolean;
    isRead?: boolean;
  }) {
    this.id = data.id;
    this._content = data.content;
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.isMine = data.isMine;
    this._isRead = data.isRead ?? false;
  }

  // ==================== GETTERS ====================
  get content(): string {
    return this._content;
  }

  get isRead(): boolean {
    return this._isRead;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Marca el mensaje como leído
   */
  markAsRead(): void {
    this._isRead = true;
  }

  /**
   * Verifica si el mensaje está pendiente de lectura
   */
  isPending(): boolean {
    return !this.isMine && !this._isRead;
  }

  /**
   * Obtiene el tiempo formateado del mensaje
   */
  getFormattedTime(): string {
    return this.timestamp.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Obtiene la fecha formateada
   */
  getFormattedDate(): string {
    const today = new Date();
    const isToday = this.timestamp.toDateString() === today.toDateString();
    
    if (isToday) {
      return 'Hoy';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = this.timestamp.toDateString() === yesterday.toDateString();

    if (isYesterday) {
      return 'Ayer';
    }

    return this.timestamp.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
    });
  }

  /**
   * Verifica si el contenido es largo
   */
  isLongMessage(): boolean {
    return this._content.length > 200;
  }

  /**
   * Obtiene una vista previa del mensaje
   */
  getPreview(maxLength: number = 50): string {
    if (this._content.length <= maxLength) {
      return this._content;
    }
    return this._content.substring(0, maxLength) + '...';
  }

  /**
   * Serializa el mensaje para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      content: this._content,
      timestamp: this.timestamp.toISOString(),
      isMine: this.isMine,
      isRead: this._isRead,
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): Message {
    return new Message({
      id: json.id as string,
      content: json.content as string,
      timestamp: json.timestamp as string | undefined,
      isMine: json.isMine as boolean,
      isRead: json.isRead as boolean | undefined,
    });
  }
}
