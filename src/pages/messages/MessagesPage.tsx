import React, { useState, useEffect, useCallback } from 'react';
import storageService, { StoredMessage } from '../../services/storageService';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import type { Conversation, Message } from '../../types';

// Datos de ejemplo
const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      name: 'Prof. María García',
      username: 'mgarcia',
      role: 'DOCENTE',
      isOnline: true,
    },
    lastMessage: {
      content: 'Claro, puedo ayudarte con esa duda sobre el examen.',
      timestamp: '10:30',
      isRead: true,
      isMine: false,
    },
    unreadCount: 0,
  },
  {
    id: '2',
    user: {
      name: 'Carlos Mendoza',
      username: 'cmendoza',
      role: 'ESTUDIANTE',
      isOnline: false,
    },
    lastMessage: {
      content: '¿Tienes los apuntes de la clase de ayer?',
      timestamp: 'Ayer',
      isRead: false,
      isMine: false,
    },
    unreadCount: 2,
  },
  {
    id: '3',
    user: {
      name: 'Ana López',
      username: 'alopez',
      role: 'ESTUDIANTE',
      isOnline: true,
    },
    lastMessage: {
      content: '¡Gracias por compartir el material!',
      timestamp: 'Lun',
      isRead: true,
      isMine: true,
    },
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hola profesora, tengo una duda sobre el tema 3 del examen.',
    timestamp: '10:15',
    isMine: true,
    isRead: true,
  },
  {
    id: '2',
    content: 'Hola! Claro, dime ¿cuál es tu duda específica?',
    timestamp: '10:20',
    isMine: false,
    isRead: true,
  },
  {
    id: '3',
    content: 'Es sobre las matrices inversas, no entiendo bien cómo calcularlas.',
    timestamp: '10:25',
    isMine: true,
    isRead: true,
  },
  {
    id: '4',
    content: 'Claro, puedo ayudarte con esa duda sobre el examen.',
    timestamp: '10:30',
    isMine: false,
    isRead: true,
  },
];

// Estilos dinámicos con tema
const createThemedStyles = (colors: ReturnType<typeof import('../../context/ThemeContext').useTheme>['colors']) => ({
  container: {
    display: 'flex',
    height: 'calc(100vh - 140px)',
    background: colors.cardBackground,
    border: `2px solid ${colors.border}`,
    borderRadius: '12px',
    overflow: 'hidden',
  } as React.CSSProperties,
  conversationList: {
    width: '320px',
    borderRight: `2px solid ${colors.border}`,
    display: 'flex',
    flexDirection: 'column' as const,
    background: colors.cardBackground,
  } as React.CSSProperties,
  conversationHeader: {
    padding: '1rem',
    borderBottom: `2px solid ${colors.border}`,
    fontWeight: 'bold',
    fontSize: '1.125rem',
    color: colors.textPrimary,
  } as React.CSSProperties,
  searchBox: {
    padding: '0.75rem',
    borderBottom: `1px solid ${colors.borderLight}`,
  } as React.CSSProperties,
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: `2px solid ${colors.border}`,
    borderRadius: '20px',
    fontSize: '0.875rem',
    background: colors.backgroundSecondary,
    color: colors.textPrimary,
  } as React.CSSProperties,
  conversationItems: {
    flex: 1,
    overflowY: 'auto' as const,
  } as React.CSSProperties,
  conversationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderBottom: `1px solid ${colors.borderLight}`,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,
  conversationItemActive: {
    background: colors.backgroundTertiary,
  } as React.CSSProperties,
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: colors.accent,
    color: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    position: 'relative' as const,
  } as React.CSSProperties,
  onlineIndicator: {
    position: 'absolute' as const,
    bottom: '2px',
    right: '2px',
    width: '12px',
    height: '12px',
    background: colors.success,
    border: `2px solid ${colors.cardBackground}`,
    borderRadius: '50%',
  } as React.CSSProperties,
  conversationInfo: {
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties,
  conversationName: {
    fontWeight: 'bold',
    fontSize: '0.9375rem',
    marginBottom: '0.25rem',
    color: colors.textPrimary,
  } as React.CSSProperties,
  conversationPreview: {
    fontSize: '0.8125rem',
    color: colors.textSecondary,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  } as React.CSSProperties,
  conversationMeta: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '0.25rem',
  } as React.CSSProperties,
  timestamp: {
    fontSize: '0.75rem',
    color: colors.textSecondary,
  } as React.CSSProperties,
  unreadBadge: {
    background: colors.accent,
    color: colors.background,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    padding: '0.125rem 0.5rem',
    borderRadius: '10px',
  } as React.CSSProperties,
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  } as React.CSSProperties,
  chatHeader: {
    padding: '1rem',
    borderBottom: `2px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: colors.cardBackground,
  } as React.CSSProperties,
  chatHeaderInfo: {
    flex: 1,
  } as React.CSSProperties,
  chatHeaderName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: colors.textPrimary,
  } as React.CSSProperties,
  chatHeaderStatus: {
    fontSize: '0.8125rem',
    color: colors.textSecondary,
  } as React.CSSProperties,
  messagesArea: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
    background: colors.background,
  } as React.CSSProperties,
  message: {
    maxWidth: '70%',
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    fontSize: '0.9375rem',
    lineHeight: '1.4',
  } as React.CSSProperties,
  messageMine: {
    alignSelf: 'flex-end',
    background: colors.accent,
    color: colors.background,
    borderBottomRightRadius: '4px',
  } as React.CSSProperties,
  messageOther: {
    alignSelf: 'flex-start',
    background: colors.backgroundTertiary,
    color: colors.textPrimary,
    border: `1px solid ${colors.borderLight}`,
    borderBottomLeftRadius: '4px',
  } as React.CSSProperties,
  messageTime: {
    fontSize: '0.6875rem',
    marginTop: '0.25rem',
    opacity: 0.7,
  } as React.CSSProperties,
  inputArea: {
    padding: '1rem',
    borderTop: `2px solid ${colors.border}`,
    display: 'flex',
    gap: '0.75rem',
    background: colors.cardBackground,
  } as React.CSSProperties,
  messageInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: `2px solid ${colors.border}`,
    borderRadius: '24px',
    fontSize: '0.9375rem',
    resize: 'none' as const,
    background: colors.backgroundSecondary,
    color: colors.textPrimary,
  } as React.CSSProperties,
  sendButton: {
    background: colors.accent,
    color: colors.background,
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    transition: 'opacity 0.2s ease',
  } as React.CSSProperties,
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.textSecondary,
    gap: '1rem',
  } as React.CSSProperties,
  optionsButton: {
    background: 'transparent',
    border: `2px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: colors.textPrimary,
  } as React.CSSProperties,
  attachButton: {
    background: 'transparent',
    border: `2px solid ${colors.border}`,
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    cursor: 'pointer',
    fontSize: '1.25rem',
  } as React.CSSProperties,
});

const MessagesPage: React.FC = () => {
  const { colors } = useTheme();
  const styles = createThemedStyles(colors);
  
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar conversaciones y mensajes del localStorage
  const loadData = useCallback(() => {
    const savedMessages = storageService.messages.getByConversation(selectedConversation?.id || '1');
    
    // Si no hay mensajes guardados, usar los mock y guardarlos
    if (savedMessages.length === 0) {
      // Convertir mock a formato de storageService y guardar
      mockMessages.forEach(msg => {
        storageService.messages.create({
          conversationId: '1',
          senderId: msg.isMine ? (user?.id?.toString() || 'current-user') : 'mgarcia',
          content: msg.content,
        });
      });
      setMessages(mockMessages);
    } else {
      // Convertir mensajes guardados al formato del componente
      const currentUserId = user?.id?.toString() || 'current-user';
      const formattedMessages: Message[] = savedMessages.map((m: StoredMessage) => ({
        id: m.id,
        content: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
        isMine: m.senderId === currentUserId,
        isRead: m.isRead,
      }));
      setMessages(formattedMessages.length > 0 ? formattedMessages : mockMessages);
    }
    
    setConversations(mockConversations);
    if (mockConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(mockConversations[0]);
    }
  }, [user, selectedConversation]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const currentUserId = user?.id?.toString() || 'current-user';
      
      // Guardar en localStorage y obtener el mensaje con ID generado
      const savedMessage = storageService.messages.create({
        conversationId: selectedConversation.id,
        senderId: currentUserId,
        content: newMessage.trim(),
      });
      
      // Actualizar UI
      const displayMessage: Message = {
        id: savedMessage.id,
        content: newMessage.trim(),
        timestamp: new Date(savedMessage.createdAt).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
        isMine: true,
        isRead: false,
      };
      
      setMessages(prev => [...prev, displayMessage]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: colors.textPrimary }}>
        Mensajes Directos
      </h1>
      
      <div style={styles.container}>
        {/* Lista de Conversaciones */}
        <div style={styles.conversationList}>
          <div style={styles.conversationHeader}>💬 Chats</div>
          <div style={styles.searchBox}>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Buscar conversación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={styles.conversationItems}>
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                style={{
                  ...styles.conversationItem,
                  ...(selectedConversation?.id === conv.id ? styles.conversationItemActive : {}),
                }}
                onClick={() => setSelectedConversation(conv)}
              >
                <div style={styles.avatar}>
                  {conv.user.name.charAt(0)}
                  {conv.user.isOnline && <div style={styles.onlineIndicator} />}
                </div>
                <div style={styles.conversationInfo}>
                  <div style={styles.conversationName}>{conv.user.name}</div>
                  <div style={styles.conversationPreview}>
                    {conv.lastMessage.isMine && 'Tú: '}
                    {conv.lastMessage.content}
                  </div>
                </div>
                <div style={styles.conversationMeta}>
                  <span style={styles.timestamp}>{conv.lastMessage.timestamp}</span>
                  {conv.unreadCount > 0 && (
                    <span style={styles.unreadBadge}>{conv.unreadCount}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de Chat */}
        <div style={styles.chatArea}>
          {selectedConversation ? (
            <>
              {/* Header del Chat */}
              <div style={styles.chatHeader}>
                <div style={styles.avatar}>
                  {selectedConversation.user.name.charAt(0)}
                  {selectedConversation.user.isOnline && <div style={styles.onlineIndicator} />}
                </div>
                <div style={styles.chatHeaderInfo}>
                  <div style={styles.chatHeaderName}>{selectedConversation.user.name}</div>
                  <div style={styles.chatHeaderStatus}>
                    {selectedConversation.user.isOnline ? '🟢 En línea' : '⚫ Desconectado'}
                    {' • '}
                    {selectedConversation.user.role === 'DOCENTE' ? 'Docente' : 'Estudiante'}
                  </div>
                </div>
                <button style={styles.optionsButton}>
                  ⋮ Opciones
                </button>
              </div>

              {/* Mensajes */}
              <div style={styles.messagesArea}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      ...styles.message,
                      ...(msg.isMine ? styles.messageMine : styles.messageOther),
                    }}
                  >
                    {msg.content}
                    <div style={styles.messageTime}>
                      {msg.timestamp}
                      {msg.isMine && (msg.isRead ? ' ✓✓' : ' ✓')}
                    </div>
                  </div>
                ))}
              </div>

              <div style={styles.inputArea}>
                <button style={styles.attachButton} title="Adjuntar archivo">
                  📎
                </button>
                <input
                  style={styles.messageInput}
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  style={{
                    ...styles.sendButton,
                    opacity: newMessage.trim() ? 1 : 0.5,
                  }}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  title="Enviar mensaje"
                >
                  ➤
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={{ fontSize: '4rem' }}>💬</div>
              <h3 style={{ fontWeight: 'bold', color: colors.textPrimary }}>
                Selecciona una conversación
              </h3>
              <p>Elige un chat de la lista para comenzar a conversar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
