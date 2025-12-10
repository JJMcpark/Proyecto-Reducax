/**
 * Constantes de la aplicación Reducax
 */

// Claves de almacenamiento local
export const STORAGE_KEYS = {
  TOKEN: 'reducax_token',
  USER: 'reducax_user',
  POSTS: 'reducax_posts',
  MESSAGES: 'reducax_messages',
  CONVERSATIONS: 'reducax_conversations',
  NOTIFICATIONS: 'reducax_notifications',
  USERS: 'reducax_users',
  SETTINGS: 'reducax_settings',
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FEED: '/feed',
  MESSAGES: '/messages',
  PROFILE: '/perfil',
  SETTINGS: '/settings',
  NOT_FOUND: '*',
} as const;

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 10000,
  ENDPOINTS: {
    USERS: '/users',
    POSTS: '/posts',
    MESSAGES: '/messages',
    NOTIFICATIONS: '/notifications',
  },
} as const;

// Roles de usuario
export const USER_ROLES = {
  ESTUDIANTE: 'ESTUDIANTE',
  DOCENTE: 'DOCENTE',
  ADMINISTRADOR: 'ADMINISTRADOR',
} as const;

// Configuración de UI
export const UI_CONFIG = {
  POSTS_PER_PAGE: 10,
  MESSAGES_PER_PAGE: 20,
  NOTIFICATIONS_PER_PAGE: 15,
  MAX_POST_LENGTH: 2000,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifica tu conexión a internet.',
  INVALID_CREDENTIALS: 'Credenciales inválidas.',
  USER_NOT_FOUND: 'Usuario no encontrado.',
  SESSION_EXPIRED: 'Tu sesión ha expirado. Inicia sesión nuevamente.',
  GENERIC_ERROR: 'Ha ocurrido un error. Intenta nuevamente.',
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso.',
  REGISTER_SUCCESS: 'Registro exitoso. ¡Bienvenido a Reducax!',
  POST_CREATED: 'Publicación creada exitosamente.',
  MESSAGE_SENT: 'Mensaje enviado.',
  PROFILE_UPDATED: 'Perfil actualizado.',
} as const;
