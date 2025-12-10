/**
 * Tipos de Notificaciones
 * @module types/notification
 */

/**
 * Tipos de notificación disponibles
 */
export type NotificationType = 
  | 'like'          // Alguien dio like a tu publicación
  | 'comment'       // Alguien comentó en tu publicación
  | 'follow'        // Alguien te siguió
  | 'mention'       // Alguien te mencionó
  | 'announcement'; // Anuncio del sistema

/**
 * Representa una notificación del sistema
 */
export interface Notification {
  /** ID único de la notificación */
  id: string;
  /** Tipo de notificación */
  type: NotificationType;
  /** Mensaje descriptivo */
  message: string;
  /** Tiempo relativo o absoluto */
  time: string;
  /** Si fue leída por el usuario */
  isRead: boolean;
  /** ID del recurso relacionado (post, usuario, etc.) */
  relatedId?: string;
}

/**
 * Estado de las notificaciones del usuario
 */
export interface NotificationState {
  /** Lista de notificaciones */
  notifications: Notification[];
  /** Cantidad de notificaciones sin leer */
  unreadCount: number;
  /** Si se está cargando */
  loading: boolean;
}
