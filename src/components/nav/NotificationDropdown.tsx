import React, { useState, useRef, useEffect } from 'react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'announcement';
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    message: 'Prof. María García le dio me gusta a tu publicación',
    time: 'Hace 5 min',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    message: 'Carlos Mendoza comentó en tu publicación',
    time: 'Hace 1 hora',
    isRead: false,
  },
  {
    id: '3',
    type: 'announcement',
    message: 'Nueva guía de estudio disponible en Matemáticas',
    time: 'Hace 2 horas',
    isRead: true,
  },
];

const styles = {
  container: {
    position: 'relative' as const,
    marginRight: '0.75rem',
  } as React.CSSProperties,
  button: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    position: 'relative' as const,
    color: '#fff',
    fontSize: '1.25rem',
  } as React.CSSProperties,
  badge: {
    position: 'absolute' as const,
    top: '2px',
    right: '2px',
    background: '#fff',
    color: '#000',
    fontSize: '0.625rem',
    fontWeight: 'bold',
    padding: '0.125rem 0.375rem',
    borderRadius: '10px',
    minWidth: '16px',
    textAlign: 'center' as const,
  } as React.CSSProperties,
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '8px',
    width: '320px',
    maxHeight: '400px',
    overflowY: 'auto' as const,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1050,
  } as React.CSSProperties,
  header: {
    padding: '1rem',
    borderBottom: '2px solid #000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as React.CSSProperties,
  title: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#000',
  } as React.CSSProperties,
  markAllRead: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.75rem',
    color: '#666',
  } as React.CSSProperties,
  notificationItem: {
    padding: '0.875rem 1rem',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,
  notificationUnread: {
    background: '#f9f9f9',
  } as React.CSSProperties,
  notificationIcon: {
    marginRight: '0.5rem',
  } as React.CSSProperties,
  notificationMessage: {
    fontSize: '0.875rem',
    color: '#000',
    lineHeight: '1.4',
  } as React.CSSProperties,
  notificationTime: {
    fontSize: '0.75rem',
    color: '#888',
    marginTop: '0.25rem',
  } as React.CSSProperties,
  emptyState: {
    padding: '2rem',
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '0.875rem',
  } as React.CSSProperties,
};

const getNotificationIcon = (type: Notification['type']): string => {
  switch (type) {
    case 'like': return '❤️';
    case 'comment': return '💬';
    case 'follow': return '👤';
    case 'mention': return '@';
    case 'announcement': return '📢';
    default: return '🔔';
  }
};

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  return (
    <div style={styles.container} ref={dropdownRef}>
      <button
        style={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Notificaciones"
      >
        🔔
        {unreadCount > 0 && (
          <span style={styles.badge}>{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.header}>
            <span style={styles.title}>Notificaciones</span>
            {unreadCount > 0 && (
              <button style={styles.markAllRead} onClick={markAllAsRead}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div style={styles.emptyState}>
              No tienes notificaciones
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  ...styles.notificationItem,
                  ...(notification.isRead ? {} : styles.notificationUnread),
                }}
                onClick={() => markAsRead(notification.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f0f0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = notification.isRead ? 'transparent' : '#f9f9f9')}
              >
                <div style={styles.notificationMessage}>
                  <span style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </span>
                  {notification.message}
                </div>
                <div style={styles.notificationTime}>{notification.time}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
