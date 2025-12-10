/**
 * Tipos de Usuario y Autenticación
 * @module types/user
 */

/**
 * Roles disponibles para usuarios en la plataforma
 */
export type UserRole = 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';

/**
 * Representa un usuario de la plataforma Reducax
 */
export interface User {
  /** Identificador único del usuario */
  id: string;
  /** Nombre completo del usuario */
  name?: string;
  /** Nombre de usuario único */
  username: string;
  /** Correo electrónico */
  email: string;
  /** Token de autenticación JWT */
  token: string;
  /** URL del avatar del usuario */
  avatar?: string;
  /** Rol del usuario en la plataforma */
  role?: UserRole;
  /** Institución educativa a la que pertenece */
  institution?: string;
  /** Biografía o descripción del usuario */
  bio?: string;
  /** Fecha de creación de la cuenta */
  createdAt?: string;
}

/**
 * Estado de autenticación de la aplicación
 */
export interface AuthState {
  /** Indica si el usuario está autenticado */
  isAuthenticated: boolean;
  /** Usuario actual o null si no está autenticado */
  user: User | null;
  /** Indica si hay una operación de auth en progreso */
  loading: boolean;
  /** Mensaje de error de autenticación */
  error: string | null;
}

/**
 * Credenciales para iniciar sesión
 */
export interface LoginCredentials {
  /** Nombre de usuario */
  username: string;
  /** Contraseña */
  password: string;
}

/**
 * Credenciales para registrar una nueva cuenta
 */
export interface RegisterCredentials {
  /** Nombre de usuario deseado */
  username: string;
  /** Correo electrónico */
  email: string;
  /** Contraseña */
  password: string;
  /** Institución educativa (opcional) */
  institution?: string;
}

/**
 * Respuesta del servidor al autenticar
 */
export interface AuthResponse {
  /** Usuario autenticado */
  user: User;
  /** Token JWT generado */
  token: string;
  /** Mensaje opcional del servidor */
  message?: string;
}
