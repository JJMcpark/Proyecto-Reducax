import type { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

// Servicio de autenticación externo (simulado localmente para desarrollo)
// En producción, cambiar a llamadas API reales

const STORAGE_KEYS = {
  USER: 'reducax_user',
  TOKEN: 'reducax_token',
  USERS_DB: 'reducax_users_db', // Base de datos local de usuarios para pruebas
} as const;

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generar token simple
const generateToken = (): string => {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Obtener usuarios registrados (simulado)
const getStoredUsers = (): Array<{ username: string; email: string; password: string }> => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS_DB);
  return users ? JSON.parse(users) : [];
};

// Guardar usuarios (simulado)
const saveStoredUsers = (users: Array<{ username: string; email: string; password: string }>) => {
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await delay(800); // Simular latencia de red

    const users = getStoredUsers();
    const foundUser = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (!foundUser) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    const user: User = {
      id: `user_${Date.now()}`,
      username: foundUser.username,
      email: foundUser.email,
      token: generateToken(),
      role: 'ESTUDIANTE',
      institution: 'Universidad Nacional',
    };

    return user;
  },

  async register(credentials: RegisterCredentials): Promise<User> {
    await delay(800); // Simular latencia de red

    const users = getStoredUsers();
    
    // Verificar si ya existe
    if (users.some(u => u.username === credentials.username)) {
      throw new Error('El nombre de usuario ya está en uso');
    }
    if (users.some(u => u.email === credentials.email)) {
      throw new Error('El email ya está registrado');
    }

    // Registrar nuevo usuario
    users.push({
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    });
    saveStoredUsers(users);

    const user: User = {
      id: `user_${Date.now()}`,
      username: credentials.username,
      email: credentials.email,
      token: generateToken(),
      role: 'ESTUDIANTE',
      institution: credentials.institution || 'Sin institución',
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

  // Método para desarrollo: crear usuario de prueba
  createTestUser(): void {
    const users = getStoredUsers();
    if (!users.some(u => u.username === 'demo')) {
      users.push({
        username: 'demo',
        email: 'demo@reducax.edu',
        password: 'demo123',
      });
      saveStoredUsers(users);
      console.log('Usuario de prueba creado: demo / demo123');
    }
  }
};
