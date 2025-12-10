// Constantes de rutas - Reducax Red Social Educativa
export const ROUTES = {
  // Página principal
  HOME: '/',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Feed principal
  FEED: '/feed',
  
  // Post individual
  POST: '/post/:id',
  
  // Usuario
  PROFILE: '/profile',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
  
  // Educación
  INSTITUTIONS: '/institutions',
  GROUPS: '/groups',
  
  // 404
  NOT_FOUND: '*',
} as const;

// Tipo para las rutas
export type RouteKeys = keyof typeof ROUTES;
export type RoutePaths = typeof ROUTES[RouteKeys];
