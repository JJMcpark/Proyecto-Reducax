/**
 * Tipos de Mensajería y Conversaciones
 * @module types/message
 */

import type { UserRole } from './user.types';

/**
 * Usuario en una conversación
 */
export interface ConversationUser {
  /** Nombre completo */
  name: string;
  /** Nombre de usuario */
  username: string;
  /** URL del avatar */
  avatar?: string;
  /** Rol del usuario */
  role: UserRole;
  /** Si está conectado actualmente */
  isOnline: boolean;
}

/**
 * Último mensaje de una conversación
 */
export interface LastMessage {
  /** Contenido del mensaje */
  content: string;
  /** Marca de tiempo */
  timestamp: string;
  /** Si fue leído */
  isRead: boolean;
  /** Si fue enviado por el usuario actual */
  isMine: boolean;
}

/**
 * Representa una conversación con otro usuario
 */
export interface Conversation {
  /** ID único de la conversación */
  id: string;
  /** Usuario con quien se conversa */
  user: ConversationUser;
  /** Último mensaje de la conversación */
  lastMessage: LastMessage;
  /** Cantidad de mensajes sin leer */
  unreadCount: number;
}

/**
 * Representa un mensaje individual
 */
export interface Message {
  /** ID único del mensaje */
  id: string;
  /** Contenido del mensaje */
  content: string;
  /** Marca de tiempo */
  timestamp: string;
  /** Si fue enviado por el usuario actual */
  isMine: boolean;
  /** Si fue leído por el destinatario */
  isRead: boolean;
}

/**
 * Datos para enviar un nuevo mensaje
 */
export interface SendMessageData {
  /** ID del destinatario */
  recipientId: string;
  /** Contenido del mensaje */
  content: string;
}
