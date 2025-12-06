// Constantes de rutas - Reducax Red Social Educativa
export const ROUTES = {
  // Página principal
  HOME: '/',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Feed principal
  FEED: '/feed',
  
  // Usuario
  PROFILE: '/feed/profile',
  MESSAGES: '/feed/messages',
  SETTINGS: '/feed/settings',
  
  // Instituciones
  INSTITUTIONS: '/feed/institutions',
  
  // 404
  NOT_FOUND: '*',
} as const;

// Tipo para las rutas
export type RouteKeys = keyof typeof ROUTES;
export type RoutePaths = typeof ROUTES[RouteKeys];
