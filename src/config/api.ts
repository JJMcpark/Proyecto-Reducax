/**
 * Configuración de la API
 * Centraliza todos los endpoints y configuración de la API
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:4000',
  ENDPOINTS: {
    posts: '/posts',
    users: '/users',
    institutions: '/institutions',
    studyGroups: '/studyGroups',
    conversations: '/conversations',
    messages: '/messages',
    notifications: '/notifications',
  },
} as const;

/**
 * Construye la URL completa para un endpoint
 */
export const buildUrl = (endpoint: keyof typeof API_CONFIG.ENDPOINTS): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}`;
};

/**
 * Construye la URL con un ID específico
 */
export const buildUrlWithId = (endpoint: keyof typeof API_CONFIG.ENDPOINTS, id: string | number): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[endpoint]}/${id}`;
};

export default API_CONFIG;
