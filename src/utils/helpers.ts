/**
 * Funciones de utilidad para Reducax
 */

/**
 * Formatea una fecha a un formato legible
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  
  return date.toLocaleDateString('es', { 
    day: 'numeric', 
    month: 'short', 
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  });
};

/**
 * Formatea un número grande (ej: 1200 -> 1.2K)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/**
 * Genera un ID único
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Obtiene las iniciales de un nombre
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Trunca un texto a un número máximo de caracteres
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida longitud mínima de contraseña
 */
export const isValidPassword = (password: string, minLength: number = 6): boolean => {
  return password.length >= minLength;
};

/**
 * Debounce - retrasa la ejecución de una función
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
};

/**
 * Capitaliza la primera letra de cada palabra
 */
export const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Copia texto al portapapeles
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Obtiene el rol formateado para mostrar
 */
export const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    ESTUDIANTE: '📚 Estudiante',
    DOCENTE: '👨‍🏫 Docente',
    ADMINISTRADOR: '⚙️ Administrador',
  };
  return roleMap[role] || role;
};

// ==================== USER HELPERS ====================

/**
 * Verifica si un usuario puede moderar contenido
 */
export const canUserModerate = (role?: string): boolean => {
  return role === 'ADMINISTRADOR' || role === 'DOCENTE';
};

/**
 * Verifica si un usuario es administrador
 */
export const isAdmin = (role?: string): boolean => {
  return role === 'ADMINISTRADOR';
};

/**
 * Obtiene el avatar por defecto
 */
export const getDefaultAvatar = (avatar?: string): string => {
  return avatar || '/default-avatar.png';
};

// ==================== NOTIFICATION HELPERS ====================

/**
 * Obtiene el icono de una notificación según su tipo
 */
export const getNotificationIcon = (type: string): string => {
  const icons: Record<string, string> = {
    like: '❤️',
    comment: '💬',
    follow: '👤',
    mention: '@',
    announcement: '📢',
  };
  return icons[type] || '🔔';
};

// ==================== GROUP/INSTITUTION HELPERS ====================

/**
 * Crea un nuevo grupo con valores por defecto
 */
export const createStudyGroup = (
  data: { name: string; subject: string; description: string; minMembers: number; level: string },
  creatorId: number,
  institution: string
) => ({
  id: Date.now(),
  name: data.name,
  subject: data.subject,
  description: data.description,
  members: data.minMembers,
  institution,
  level: data.level,
  createdAt: new Date().toISOString().split('T')[0],
  createdBy: creatorId,
  icon: '📚',
});

/**
 * Crea una nueva institución con valores por defecto
 */
export const createInstitution = (data: { name: string; location: string; description: string }) => ({
  id: Date.now(),
  name: data.name,
  location: data.location,
  description: data.description,
  students: 0,
  professors: 0,
  groups: 0,
  rating: 0,
  icon: '🏛️',
  createdAt: new Date().toISOString().split('T')[0],
});

/**
 * Formatea la hora de un mensaje
 */
export const formatMessageTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
