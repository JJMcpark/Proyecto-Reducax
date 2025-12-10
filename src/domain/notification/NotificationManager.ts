/**
 * Clase de Dominio: Gestor de Notificaciones
 * Maneja la colección de notificaciones del usuario
 */

import { Notification, type NotificationType } from './Notification';

export class NotificationManager {
  private _notifications: Notification[];
  private _maxNotifications: number;

  constructor(notifications: Notification[] = [], maxNotifications: number = 50) {
    this._notifications = notifications;
    this._maxNotifications = maxNotifications;
  }

  // ==================== GETTERS ====================
  get notifications(): Notification[] {
    return [...this._notifications];
  }

  get unreadCount(): number {
    return this._notifications.filter((n) => !n.isRead).length;
  }

  get hasUnread(): boolean {
    return this.unreadCount > 0;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Agrega una nueva notificación
   */
  add(notification: Notification): void {
    this._notifications.unshift(notification);
    
    // Mantener el límite máximo
    if (this._notifications.length > this._maxNotifications) {
      this._notifications = this._notifications.slice(0, this._maxNotifications);
    }
  }

  /**
   * Crea y agrega una notificación rápidamente
   */
  createAndAdd(data: {
    type: NotificationType;
    message: string;
    relatedId?: string;
  }): Notification {
    const notification = new Notification({
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: data.type,
      message: data.message,
      relatedId: data.relatedId,
    });
    this.add(notification);
    return notification;
  }

  /**
   * Marca una notificación como leída
   */
  markAsRead(id: string): void {
    const notification = this._notifications.find((n) => n.id === id);
    if (notification) {
      notification.markAsRead();
    }
  }

  /**
   * Marca todas las notificaciones como leídas
   */
  markAllAsRead(): void {
    this._notifications.forEach((n) => n.markAsRead());
  }

  /**
   * Elimina una notificación
   */
  remove(id: string): void {
    this._notifications = this._notifications.filter((n) => n.id !== id);
  }

  /**
   * Limpia todas las notificaciones
   */
  clear(): void {
    this._notifications = [];
  }

  /**
   * Filtra por tipo de notificación
   */
  filterByType(type: NotificationType): Notification[] {
    return this._notifications.filter((n) => n.type === type);
  }

  /**
   * Obtiene solo las no leídas
   */
  getUnread(): Notification[] {
    return this._notifications.filter((n) => !n.isRead);
  }

  /**
   * Obtiene las notificaciones recientes (últimas 24 horas)
   */
  getRecent(): Notification[] {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this._notifications.filter((n) => n.createdAt > dayAgo);
  }

  /**
   * Serializa el gestor para almacenamiento
   */
  toJSON(): Record<string, unknown>[] {
    return this._notifications.map((n) => n.toJSON());
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(jsonArray: Record<string, unknown>[]): NotificationManager {
    const notifications = jsonArray.map((json) => Notification.fromJSON(json));
    return new NotificationManager(notifications);
  }
}
