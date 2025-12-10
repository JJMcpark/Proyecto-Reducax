/**
 * Clase de Dominio: Conversación
 * Representa una conversación entre usuarios
 */

import { Message } from './Message';
import type { UserRole } from '../user';

export interface ConversationUserData {
  name: string;
  username: string;
  avatar?: string;
  role: UserRole;
  isOnline: boolean;
}

export class Conversation {
  readonly id: string;
  private _user: ConversationUserData;
  private _messages: Message[];
  private _unreadCount: number;

  constructor(data: {
    id: string;
    user: ConversationUserData;
    messages?: Message[];
    unreadCount?: number;
  }) {
    this.id = data.id;
    this._user = data.user;
    this._messages = data.messages ?? [];
    this._unreadCount = data.unreadCount ?? 0;
  }

  // ==================== GETTERS ====================
  get user(): ConversationUserData {
    return { ...this._user };
  }

  get messages(): Message[] {
    return [...this._messages];
  }

  get unreadCount(): number {
    return this._unreadCount;
  }

  get lastMessage(): Message | null {
    return this._messages.length > 0 
      ? this._messages[this._messages.length - 1] 
      : null;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Agrega un nuevo mensaje a la conversación
   */
  addMessage(message: Message): void {
    this._messages.push(message);
    if (!message.isMine && !message.isRead) {
      this._unreadCount += 1;
    }
  }

  /**
   * Marca todos los mensajes como leídos
   */
  markAllAsRead(): void {
    this._messages.forEach((msg) => msg.markAsRead());
    this._unreadCount = 0;
  }

  /**
   * Verifica si hay mensajes sin leer
   */
  hasUnread(): boolean {
    return this._unreadCount > 0;
  }

  /**
   * Verifica si el otro usuario está en línea
   */
  isUserOnline(): boolean {
    return this._user.isOnline;
  }

  /**
   * Obtiene el último mensaje o un texto por defecto
   */
  getLastMessagePreview(): string {
    const last = this.lastMessage;
    if (!last) return 'Sin mensajes';
    return last.getPreview(40);
  }

  /**
   * Obtiene la cantidad de mensajes
   */
  getMessageCount(): number {
    return this._messages.length;
  }

  /**
   * Obtiene el tiempo del último mensaje
   */
  getLastMessageTime(): string {
    const last = this.lastMessage;
    if (!last) return '';
    return last.getFormattedTime();
  }

  /**
   * Filtra mensajes por contenido
   */
  searchMessages(query: string): Message[] {
    const lowerQuery = query.toLowerCase();
    return this._messages.filter((msg) =>
      msg.content.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Serializa la conversación para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      user: this._user,
      messages: this._messages.map((m) => m.toJSON()),
      unreadCount: this._unreadCount,
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): Conversation {
    const messagesData = json.messages as Record<string, unknown>[] | undefined;
    const messages = messagesData?.map((m) => Message.fromJSON(m)) ?? [];

    return new Conversation({
      id: json.id as string,
      user: json.user as ConversationUserData,
      messages,
      unreadCount: json.unreadCount as number | undefined,
    });
  }
}
