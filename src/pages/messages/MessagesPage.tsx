import React, { useState } from 'react';

// Tipos para mensajes
interface Conversation {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
    role: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';
    isOnline: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isRead: boolean;
    isMine: boolean;
  };
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isMine: boolean;
  isRead: boolean;
}

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

// Estilos en blanco y negro
const styles = {
  container: {
    display: 'flex',
    height: 'calc(100vh - 140px)',
    background: '#fff',
    border: '2px solid #000',
    borderRadius: '12px',
    overflow: 'hidden',
  } as React.CSSProperties,
  conversationList: {
    width: '320px',
    borderRight: '2px solid #000',
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#fff',
  } as React.CSSProperties,
  conversationHeader: {
    padding: '1rem',
    borderBottom: '2px solid #000',
    fontWeight: 'bold',
    fontSize: '1.125rem',
  } as React.CSSProperties,
  searchBox: {
    padding: '0.75rem',
    borderBottom: '1px solid #e0e0e0',
  } as React.CSSProperties,
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: '2px solid #000',
    borderRadius: '20px',
    fontSize: '0.875rem',
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
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
  } as React.CSSProperties,
  conversationItemActive: {
    background: '#f0f0f0',
  } as React.CSSProperties,
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#000',
    color: '#fff',
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
    background: '#000',
    border: '2px solid #fff',
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
  } as React.CSSProperties,
  conversationPreview: {
    fontSize: '0.8125rem',
    color: '#666',
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
    color: '#666',
  } as React.CSSProperties,
  unreadBadge: {
    background: '#000',
    color: '#fff',
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
    borderBottom: '2px solid #000',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: '#fff',
  } as React.CSSProperties,
  chatHeaderInfo: {
    flex: 1,
  } as React.CSSProperties,
  chatHeaderName: {
    fontWeight: 'bold',
    fontSize: '1rem',
  } as React.CSSProperties,
  chatHeaderStatus: {
    fontSize: '0.8125rem',
    color: '#666',
  } as React.CSSProperties,
  messagesArea: {
    flex: 1,
    padding: '1rem',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.75rem',
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
    background: '#000',
    color: '#fff',
    borderBottomRightRadius: '4px',
  } as React.CSSProperties,
  messageOther: {
    alignSelf: 'flex-start',
    background: '#f0f0f0',
    color: '#000',
    border: '1px solid #e0e0e0',
    borderBottomLeftRadius: '4px',
  } as React.CSSProperties,
  messageTime: {
    fontSize: '0.6875rem',
    marginTop: '0.25rem',
    opacity: 0.7,
  } as React.CSSProperties,
  inputArea: {
    padding: '1rem',
    borderTop: '2px solid #000',
    display: 'flex',
    gap: '0.75rem',
    background: '#fff',
  } as React.CSSProperties,
  messageInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '2px solid #000',
    borderRadius: '24px',
    fontSize: '0.9375rem',
    resize: 'none' as const,
  } as React.CSSProperties,
  sendButton: {
    background: '#000',
    color: '#fff',
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
    color: '#666',
    gap: '1rem',
  } as React.CSSProperties,
};

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aquí iría la lógica para enviar el mensaje
      console.log('Enviando mensaje:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = mockConversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
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
                <button
                  style={{
                    background: 'transparent',
                    border: '2px solid #000',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  ⋮ Opciones
                </button>
              </div>

              {/* Mensajes */}
              <div style={styles.messagesArea}>
                {mockMessages.map((msg) => (
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

              {/* Input de Mensaje */}
              <div style={styles.inputArea}>
                <button
                  style={{
                    background: 'transparent',
                    border: '2px solid #000',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                  }}
                  title="Adjuntar archivo"
                >
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
              <h3 style={{ fontWeight: 'bold', color: '#000' }}>
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
