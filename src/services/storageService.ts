// Servicio de almacenamiento local para Reducax
// Persiste todos los datos en localStorage

const STORAGE_KEYS = {
  USERS: 'reducax_users',
  POSTS: 'reducax_posts',
  MESSAGES: 'reducax_messages',
  CONVERSATIONS: 'reducax_conversations',
  NOTIFICATIONS: 'reducax_notifications',
  CURRENT_USER: 'reducax_user',
  TOKEN: 'reducax_token',
  BOOKMARKS: 'reducax_bookmarks',
} as const;

// Tipos
export interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';
  institution: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

export interface StoredPost {
  id: string;
  authorId: string;
  authorName?: string;
  content: string;
  subject?: string;
  attachments?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name?: string;
  }[];
  likes: string[]; // IDs de usuarios que dieron like
  likedBy?: string[]; // Alias para compatibilidad
  comments: StoredComment[];
  commentsList?: StoredComment[]; // Alias para compatibilidad
  shares: number;
  createdAt: string;
}

export interface StoredComment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface StoredMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface StoredConversation {
  id: string;
  participants: string[]; // IDs de usuarios
  lastMessageAt: string;
}

export interface StoredNotification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'announcement';
  message: string;
  relatedId?: string;
  isRead: boolean;
  createdAt: string;
}

// Funciones de utilidad
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Generar ID único
const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

// ==================== USUARIOS ====================
export const userStorage = {
  getAll: (): StoredUser[] => getItem(STORAGE_KEYS.USERS, []),

  getById: (id: string): StoredUser | undefined => {
    const users = userStorage.getAll();
    return users.find(u => u.id === id);
  },

  getByUsername: (username: string): StoredUser | undefined => {
    const users = userStorage.getAll();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },

  getByEmail: (email: string): StoredUser | undefined => {
    const users = userStorage.getAll();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  create: (user: Omit<StoredUser, 'id' | 'createdAt'>): StoredUser => {
    const users = userStorage.getAll();
    const newUser: StoredUser = {
      ...user,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    setItem(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  update: (id: string, updates: Partial<StoredUser>): StoredUser | undefined => {
    const users = userStorage.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;
    
    users[index] = { ...users[index], ...updates };
    setItem(STORAGE_KEYS.USERS, users);
    return users[index];
  },

  // Inicializar usuario demo si no existe
  initDemo: (): void => {
    const existing = userStorage.getByUsername('demo');
    if (!existing) {
      userStorage.create({
        username: 'demo',
        email: 'demo@reducax.edu',
        password: 'demo123',
        role: 'ESTUDIANTE',
        institution: 'Universidad Nacional',
        bio: 'Usuario de demostración de Reducax',
      });
    }
  },
};

// ==================== POSTS ====================
export const postStorage = {
  getAll: (): StoredPost[] => getItem(STORAGE_KEYS.POSTS, []),

  getById: (id: string): StoredPost | undefined => {
    const posts = postStorage.getAll();
    return posts.find(p => p.id === id);
  },

  getByAuthor: (authorId: string): StoredPost[] => {
    const posts = postStorage.getAll();
    return posts.filter(p => p.authorId === authorId);
  },

  create: (post: Omit<StoredPost, 'id' | 'likes' | 'comments' | 'shares' | 'createdAt'>): StoredPost => {
    const posts = postStorage.getAll();
    const newPost: StoredPost = {
      ...post,
      id: generateId(),
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost); // Agregar al inicio
    setItem(STORAGE_KEYS.POSTS, posts);
    return newPost;
  },

  update: (id: string, updates: Partial<StoredPost>): StoredPost | undefined => {
    const posts = postStorage.getAll();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    posts[index] = { ...posts[index], ...updates };
    setItem(STORAGE_KEYS.POSTS, posts);
    return posts[index];
  },

  delete: (id: string): boolean => {
    const posts = postStorage.getAll();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    setItem(STORAGE_KEYS.POSTS, filtered);
    return true;
  },

  toggleLike: (postId: string, userId: string): StoredPost | undefined => {
    const posts = postStorage.getAll();
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return undefined;

    const post = posts[index];
    const likeIndex = post.likes.indexOf(userId);
    
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    
    setItem(STORAGE_KEYS.POSTS, posts);
    return post;
  },

  addComment: (postId: string, authorId: string, content: string): StoredComment | undefined => {
    const posts = postStorage.getAll();
    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return undefined;

    const comment: StoredComment = {
      id: generateId(),
      authorId,
      content,
      createdAt: new Date().toISOString(),
    };
    
    posts[index].comments.push(comment);
    setItem(STORAGE_KEYS.POSTS, posts);
    return comment;
  },

  // Inicializar posts de ejemplo si no hay ninguno
  initSamplePosts: (): void => {
    const posts = postStorage.getAll();
    if (posts.length === 0) {
      // Inicializar con posts de ejemplo
      const samplePosts = [
        {
          authorId: '2',
          authorName: 'María García',
          content: '¡Nueva guía de estudio disponible! 📚 He subido material complementario sobre Álgebra Lineal. Recuerden que el examen parcial es la próxima semana.\n\nTemas cubiertos:\n• Matrices y determinantes\n• Sistemas de ecuaciones lineales\n• Espacios vectoriales\n\n#Matemáticas #AlgebraLineal #Examen',
          subject: 'Matemáticas',
        },
        {
          authorId: '1',
          authorName: 'Juan Pérez',
          content: '¿Alguien puede explicarme la diferencia entre una pila y una cola en estructuras de datos? Estoy preparando mi proyecto final y tengo algunas dudas.\n\nEntiendo que ambas son estructuras lineales pero no me queda clara la lógica de LIFO vs FIFO 🤔\n\n#ProgramaciónI #EstructurasDeDatos #Ayuda',
          subject: 'Programación',
        },
        {
          authorId: '4',
          authorName: 'Ana Torres',
          content: '🎉 Felicidades a todos los que aprobaron el parcial de Programación!\n\nLos resultados ya están publicados en el sistema. Si tienen dudas sobre su calificación, pueden pasar por mi oficina en horario de tutoría.\n\nRecuerden: ¡El próximo tema es Recursividad!\n\n#Programación #Resultados #Recursividad',
          subject: 'Programación',
        },
        {
          authorId: '3',
          authorName: 'Carlos Mendoza',
          content: 'Acabo de terminar mi proyecto de Machine Learning! 🤖\n\nUtilicé Python con TensorFlow para crear un modelo de clasificación de imágenes. El modelo alcanzó un 94% de precisión.\n\nSi alguien está interesado en colaborar en proyectos similares, ¡escríbanme!\n\n#MachineLearning #Python #TensorFlow #IA',
          subject: 'Inteligencia Artificial',
        },
        {
          authorId: '1',
          authorName: 'Juan Pérez',
          content: 'Tip de estudio del día 💡\n\nLa técnica Pomodoro me ha ayudado muchísimo:\n• 25 minutos de estudio enfocado\n• 5 minutos de descanso\n• Cada 4 pomodoros, descanso largo de 15-20 min\n\n¿Ustedes qué técnicas de estudio usan?\n\n#TipsDeEstudio #Pomodoro #Productividad',
          subject: 'Consejos',
        },
        {
          authorId: '4',
          authorName: 'Ana Torres',
          content: '🔥 Recursos gratuitos para aprender programación:\n\n1. freeCodeCamp - Cursos completos\n2. The Odin Project - Web development\n3. CS50 de Harvard - Introducción a CS\n4. LeetCode - Práctica de algoritmos\n\n¿Conocen otros recursos que recomienden?\n\n#RecursosProgramación #Aprendizaje #Gratis',
          subject: 'Recursos',
        },
        {
          authorId: '3',
          authorName: 'Carlos Mendoza',
          content: '🚀 Nuevo proyecto open source que creé:\n\nSe llama "EstudioFlow" - una app para organizar horarios de estudio con Pomodoro integrado.\n\nStack: React + Node.js + MongoDB\n\nLink del repo en mi perfil. ¡PRs bienvenidos!\n\n#OpenSource #React #NodeJS #Productividad',
          subject: 'Desarrollo Web',
        },
        {
          authorId: '2',
          authorName: 'María García',
          content: '📐 Ejercicio del día - Cálculo Diferencial:\n\nEncuentra la derivada de: f(x) = x³ · ln(x)\n\nUsa la regla del producto. El primero que responda correctamente tiene puntos extra! 🎯\n\n#CálculoDiferencial #Matemáticas #EjercicioDelDía',
          subject: 'Matemáticas',
        },
      ];
      
      // Crear posts en orden inverso para que aparezcan en orden correcto
      samplePosts.reverse().forEach(postData => {
        postStorage.create(postData);
      });
    }
  },
};

// ==================== MENSAJES ====================
export const messageStorage = {
  getAll: (): StoredMessage[] => getItem(STORAGE_KEYS.MESSAGES, []),

  getByConversation: (conversationId: string): StoredMessage[] => {
    const messages = messageStorage.getAll();
    return messages
      .filter(m => m.conversationId === conversationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  create: (message: Omit<StoredMessage, 'id' | 'isRead' | 'createdAt'>): StoredMessage => {
    const messages = messageStorage.getAll();
    const newMessage: StoredMessage = {
      ...message,
      id: generateId(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    setItem(STORAGE_KEYS.MESSAGES, messages);
    
    // Actualizar último mensaje de la conversación
    conversationStorage.updateLastMessage(message.conversationId);
    
    return newMessage;
  },

  markAsRead: (conversationId: string, userId: string): void => {
    const messages = messageStorage.getAll();
    let updated = false;
    
    messages.forEach(m => {
      if (m.conversationId === conversationId && m.senderId !== userId && !m.isRead) {
        m.isRead = true;
        updated = true;
      }
    });
    
    if (updated) {
      setItem(STORAGE_KEYS.MESSAGES, messages);
    }
  },
};

// ==================== CONVERSACIONES ====================
export const conversationStorage = {
  getAll: (): StoredConversation[] => getItem(STORAGE_KEYS.CONVERSATIONS, []),

  getById: (id: string): StoredConversation | undefined => {
    const conversations = conversationStorage.getAll();
    return conversations.find(c => c.id === id);
  },

  getByUser: (userId: string): StoredConversation[] => {
    const conversations = conversationStorage.getAll();
    return conversations
      .filter(c => c.participants.includes(userId))
      .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
  },

  findOrCreate: (userId1: string, userId2: string): StoredConversation => {
    const conversations = conversationStorage.getAll();
    const existing = conversations.find(c => 
      c.participants.includes(userId1) && c.participants.includes(userId2)
    );
    
    if (existing) return existing;

    const newConversation: StoredConversation = {
      id: generateId(),
      participants: [userId1, userId2],
      lastMessageAt: new Date().toISOString(),
    };
    
    conversations.push(newConversation);
    setItem(STORAGE_KEYS.CONVERSATIONS, conversations);
    return newConversation;
  },

  updateLastMessage: (conversationId: string): void => {
    const conversations = conversationStorage.getAll();
    const index = conversations.findIndex(c => c.id === conversationId);
    if (index !== -1) {
      conversations[index].lastMessageAt = new Date().toISOString();
      setItem(STORAGE_KEYS.CONVERSATIONS, conversations);
    }
  },
};

// ==================== NOTIFICACIONES ====================
export const notificationStorage = {
  getAll: (): StoredNotification[] => getItem(STORAGE_KEYS.NOTIFICATIONS, []),

  getByUser: (userId: string): StoredNotification[] => {
    const notifications = notificationStorage.getAll();
    return notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  create: (notification: Omit<StoredNotification, 'id' | 'isRead' | 'createdAt'>): StoredNotification => {
    const notifications = notificationStorage.getAll();
    const newNotification: StoredNotification = {
      ...notification,
      id: generateId(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    notifications.unshift(newNotification);
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    return newNotification;
  },

  markAsRead: (id: string): void => {
    const notifications = notificationStorage.getAll();
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications[index].isRead = true;
      setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  },

  markAllAsRead: (userId: string): void => {
    const notifications = notificationStorage.getAll();
    let updated = false;
    
    notifications.forEach(n => {
      if (n.userId === userId && !n.isRead) {
        n.isRead = true;
        updated = true;
      }
    });
    
    if (updated) {
      setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
    }
  },
};

// ==================== BOOKMARKS ====================
export const bookmarkStorage = {
  getAll: (userId: string): string[] => {
    const allBookmarks = getItem<Record<string, string[]>>(STORAGE_KEYS.BOOKMARKS, {});
    return allBookmarks[userId] || [];
  },

  toggle: (userId: string, postId: string): boolean => {
    const allBookmarks = getItem<Record<string, string[]>>(STORAGE_KEYS.BOOKMARKS, {});
    if (!allBookmarks[userId]) {
      allBookmarks[userId] = [];
    }
    
    const index = allBookmarks[userId].indexOf(postId);
    const isBookmarked = index === -1;
    
    if (isBookmarked) {
      allBookmarks[userId].push(postId);
    } else {
      allBookmarks[userId].splice(index, 1);
    }
    
    setItem(STORAGE_KEYS.BOOKMARKS, allBookmarks);
    return isBookmarked;
  },

  isBookmarked: (userId: string, postId: string): boolean => {
    const bookmarks = bookmarkStorage.getAll(userId);
    return bookmarks.includes(postId);
  },

  getBookmarkedPosts: (userId: string): StoredPost[] => {
    const bookmarkIds = bookmarkStorage.getAll(userId);
    const allPosts = postStorage.getAll();
    return allPosts.filter(p => bookmarkIds.includes(p.id));
  },
};

// ==================== INICIALIZACIÓN ====================
export const initializeStorage = (): void => {
  userStorage.initDemo();
  postStorage.initSamplePosts();
};

export default {
  users: userStorage,
  posts: postStorage,
  messages: messageStorage,
  conversations: conversationStorage,
  notifications: notificationStorage,
  bookmarks: bookmarkStorage,
  initialize: initializeStorage,
};
