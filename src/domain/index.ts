/**
 * Barrel Export Principal - Clases de Dominio
 * 
 * Importa todas las clases de dominio desde un único punto:
 * import { User, Post, Message, Notification } from '@/domain';
 * 
 * @module domain
 */

// ==================== USER ====================
export { User, UserCredentials, type UserRole } from './user';

// ==================== POST ====================
export { Post, PostComment, type PostAuthorData, type PostAttachment } from './post';

// ==================== MESSAGE ====================
export { Message, Conversation, type ConversationUserData } from './message';

// ==================== NOTIFICATION ====================
export { Notification, NotificationManager, type NotificationType } from './notification';

// ==================== GROUP ====================
export { 
  StudyGroup, 
  StudyGroupManager, 
  type IStudyGroup, 
  type IStudyGroupCreate, 
  type StudyGroupLevel 
} from './group';

// ==================== INSTITUTION ====================
export { 
  Institution, 
  InstitutionManager, 
  type IInstitution, 
  type IInstitutionCreate 
} from './institution';
