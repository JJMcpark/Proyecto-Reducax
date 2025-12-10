/**
 * Barrel Export - Tipos centralizados para Reducax
 * 
 * Este archivo re-exporta todos los tipos del proyecto desde un único punto.
 * Uso: import { User, Post, Message, Notification } from '@/types';
 * 
 * @module types
 */

// ==================== USER & AUTH ====================
export type {
  UserRole,
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from './user.types';

// ==================== POSTS ====================
export type {
  PostAuthor,
  PostAttachment,
  PostComment,
  Post,
  CreatePostData,
} from './post.types';

// ==================== MENSAJES ====================
export type {
  ConversationUser,
  LastMessage,
  Conversation,
  Message,
} from './message.types';

// ==================== NOTIFICACIONES ====================
export type {
  NotificationType,
  Notification,
  NotificationState,
} from './notification.types';

// ==================== GRUPOS ====================
export type {
  StudyGroupLevel,
  StudyGroup,
  CreateStudyGroupData,
} from './group.types';

// ==================== INSTITUCIONES ====================
export type {
  Institution,
  CreateInstitutionData,
} from './institution.types';

// ==================== UI ====================
export type {
  MenuItem,
  DropdownOption,
  ModalProps,
  LoadingState,
  PaginationProps,
  ApiResponse,
} from './ui.types';
