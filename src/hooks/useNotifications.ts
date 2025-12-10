import { useState, useEffect, useCallback } from 'react';
import { notificationStorage, type StoredNotification } from '../services/storageService';
import type { Notification, NotificationType } from '../types';

/**
 * Hook para gestionar notificaciones del usuario
 */
export function useNotifications(currentUserId: string | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapear StoredNotification a Notification
  const mapStoredNotification = useCallback((notif: StoredNotification): Notification => ({
    id: notif.id,
    type: notif.type as NotificationType,
    message: notif.message,
    time: formatRelativeTime(notif.createdAt),
    isRead: notif.isRead,
    relatedId: notif.relatedId,
  }), []);

  // Formatear tiempo relativo
  function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  // Cargar notificaciones
  const loadNotifications = useCallback(() => {
    if (!currentUserId) return;

    setLoading(true);
    try {
      const stored = notificationStorage.getByUser(currentUserId);
      const mapped = stored.map(mapStoredNotification);
      setNotifications(mapped);
    } catch (err) {
      setError('Error al cargar notificaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId, mapStoredNotification]);

  // Cargar al montar
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Marcar una como leída
  const markAsRead = useCallback((notificationId: string) => {
    notificationStorage.markAsRead(notificationId);
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  }, []);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(() => {
    if (!currentUserId) return;

    notificationStorage.markAllAsRead(currentUserId);
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, [currentUserId]);

  // Eliminar notificación
  const deleteNotification = useCallback((notificationId: string) => {
    // Eliminar del estado local (storage no tiene delete implementado)
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    return true;
  }, []);

  // Crear notificación (para uso interno o testing)
  const createNotification = useCallback((data: {
    type: NotificationType;
    message: string;
    relatedId?: string;
  }) => {
    if (!currentUserId) return null;

    try {
      const created = notificationStorage.create({
        userId: currentUserId,
        type: data.type,
        message: data.message,
        relatedId: data.relatedId,
      });

      const mapped = mapStoredNotification(created);
      setNotifications(prev => [mapped, ...prev]);
      return mapped;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [currentUserId, mapStoredNotification]);

  // Estadísticas
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    hasUnread,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
  };
}
