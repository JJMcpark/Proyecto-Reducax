// Tipos de autenticación para Reducax - Red Social Educativa

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  avatar?: string;
  role?: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';
  institution?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  institution?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}
