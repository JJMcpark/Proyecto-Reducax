import { useState, useEffect, useCallback } from 'react';
import storageService, { type StoredMessage } from '../services/storageService';
import type { Conversation, Message, UserRole } from '../types';

/**
 * Hook para gestionar mensajes y conversaciones
 */
export function useMessages(currentUserId: string | undefined) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapear StoredMessage a Message
  const mapStoredMessage = useCallback((msg: StoredMessage, userId: string): Message => ({
    id: msg.id,
    content: msg.content,
    timestamp: msg.createdAt,
    isMine: msg.senderId === userId,
    isRead: msg.isRead,
  }), []);

  // Cargar conversaciones
  const loadConversations = useCallback(() => {
    if (!currentUserId) return;

    setLoading(true);
    try {
      const storedConversations = storageService.conversations.getByUser(currentUserId);
      
      // Mapear a tipo Conversation
      const mappedConversations: Conversation[] = storedConversations.map((conv) => {
        // Obtener el otro participante
        const otherUserId = conv.participants.find((p: string) => p !== currentUserId) || '';
        const otherUser = storageService.users.getById(otherUserId);
        
        // Obtener último mensaje
        const convMessages = storageService.messages.getByConversation(conv.id);
        const lastMsg = convMessages[convMessages.length - 1];
        
        // Contar mensajes sin leer
        const unreadCount = convMessages.filter(
          (m: StoredMessage) => !m.isRead && m.senderId !== currentUserId
        ).length;

        return {
          id: conv.id,
          user: {
            name: otherUser?.username || 'Usuario',
            username: otherUser?.username || 'unknown',
            avatar: otherUser?.avatar,
            role: (otherUser?.role || 'ESTUDIANTE') as UserRole,
            isOnline: false,
          },
          lastMessage: lastMsg ? {
            content: lastMsg.content,
            timestamp: lastMsg.createdAt,
            isRead: lastMsg.isRead,
            isMine: lastMsg.senderId === currentUserId,
          } : {
            content: 'Sin mensajes',
            timestamp: conv.lastMessageAt,
            isRead: true,
            isMine: false,
          },
          unreadCount,
        };
      });

      setConversations(mappedConversations);
    } catch (err) {
      setError('Error al cargar conversaciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  // Cargar mensajes de una conversación
  const loadMessages = useCallback((conversationId: string) => {
    if (!currentUserId) return;

    try {
      const storedMessages = storageService.messages.getByConversation(conversationId);
      const mappedMessages = storedMessages.map((m: StoredMessage) => mapStoredMessage(m, currentUserId));
      setMessages(mappedMessages);
      setSelectedConversationId(conversationId);

      // Marcar como leídos
      storageService.messages.markAsRead(conversationId, currentUserId);
      
      // Actualizar contador de no leídos
      loadConversations();
    } catch (err) {
      setError('Error al cargar mensajes');
      console.error(err);
    }
  }, [currentUserId, mapStoredMessage, loadConversations]);

  // Enviar mensaje
  const sendMessage = useCallback((conversationId: string, content: string) => {
    if (!currentUserId || !content.trim()) return null;

    try {
      const newMsg = storageService.messages.create({
        conversationId,
        senderId: currentUserId,
        content: content.trim(),
      });

      const mappedMsg = mapStoredMessage(newMsg, currentUserId);
      setMessages(prev => [...prev, mappedMsg]);
      loadConversations();

      return mappedMsg;
    } catch (err) {
      setError('Error al enviar mensaje');
      console.error(err);
      return null;
    }
  }, [currentUserId, mapStoredMessage, loadConversations]);

  // Crear nueva conversación
  const createConversation = useCallback((otherUserId: string) => {
    if (!currentUserId) return null;

    try {
      // Usar findOrCreate que ya existe en el storage
      const conv = storageService.conversations.findOrCreate(currentUserId, otherUserId);
      loadConversations();
      return conv.id;
    } catch (err) {
      setError('Error al crear conversación');
      console.error(err);
      return null;
    }
  }, [currentUserId, loadConversations]);

  // Cargar al montar
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Total de mensajes sin leer
  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return {
    conversations,
    messages,
    selectedConversationId,
    loading,
    error,
    totalUnread,
    loadConversations,
    loadMessages,
    sendMessage,
    createConversation,
    setSelectedConversationId,
  };
}
