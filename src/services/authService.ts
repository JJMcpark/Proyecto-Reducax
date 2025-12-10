import type { LoginCredentials, RegisterCredentials, User } from '../types';
import { userStorage, initializeStorage } from './storageService';

// Servicio de autenticación usando localStorage
// Los datos persisten aunque se cierre el navegador

const STORAGE_KEYS = {
  USER: 'reducax_user',
  TOKEN: 'reducax_token',
} as const;

// Generar token simple
const generateToken = (): string => {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Simular delay de red para mejor UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(500); // Simular latencia

    const foundUser = userStorage.getByUsername(credentials.username);

    if (!foundUser) {
      throw new Error('Usuario no encontrado');
    }

    if (foundUser.password !== credentials.password) {
      throw new Error('Contraseña incorrecta');
    }

    // Crear objeto User sin la contraseña
    const user: User = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      token: generateToken(),
      role: foundUser.role,
      institution: foundUser.institution,
      avatar: foundUser.avatar,
    };

    return user;
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    await delay(500); // Simular latencia

    // Verificar si el usuario ya existe
    if (userStorage.getByUsername(credentials.username)) {
      throw new Error('El nombre de usuario ya está en uso');
    }

    if (userStorage.getByEmail(credentials.email)) {
      throw new Error('El email ya está registrado');
    }

    // Crear nuevo usuario
    const newUser = userStorage.create({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      role: 'ESTUDIANTE',
      institution: credentials.institution || 'Sin institución',
      bio: '',
    });

    // Retornar User sin contraseña
    const user: User = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token: generateToken(),
      role: newUser.role,
      institution: newUser.institution,
      avatar: newUser.avatar,
    };

    return user;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  saveAuth(user: User): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, user.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Inicializar datos de prueba
  createTestUser(): void {
    initializeStorage();
    console.log('Datos inicializados. Usuario de prueba: demo/demo123');
  }
};
