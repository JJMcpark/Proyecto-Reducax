/**
 * Tipos de UI/Interfaz
 * @module types/ui
 */

/**
 * Representa un ítem del menú de navegación
 */
export interface MenuItem {
  /** Identificador único del ítem */
  id: string;
  /** Texto a mostrar */
  label: string;
  /** Ruta de navegación */
  path: string;
  /** Icono opcional (nombre o componente) */
  icon?: string;
  /** Si requiere autenticación */
  requiresAuth?: boolean;
  /** Si está activo actualmente */
  isActive?: boolean;
}

/**
 * Opción para componentes dropdown/select
 */
export interface DropdownOption {
  /** Valor del option */
  value: string;
  /** Texto a mostrar */
  label: string;
  /** Si está deshabilitado */
  disabled?: boolean;
}

/**
 * Props base para componentes de modal
 */
export interface ModalProps {
  /** Si el modal está abierto */
  isOpen: boolean;
  /** Callback para cerrar el modal */
  onClose: () => void;
  /** Título del modal */
  title?: string;
}

/**
 * Estado de loading para componentes
 */
export interface LoadingState {
  /** Si está cargando */
  isLoading: boolean;
  /** Mensaje de carga opcional */
  message?: string;
}

/**
 * Props para componentes de paginación
 */
export interface PaginationProps {
  /** Página actual (1-indexed) */
  currentPage: number;
  /** Total de páginas */
  totalPages: number;
  /** Callback al cambiar de página */
  onPageChange: (page: number) => void;
  /** Items por página */
  itemsPerPage?: number;
}

/**
 * Respuesta genérica de API
 */
export interface ApiResponse<T = unknown> {
  /** Datos de la respuesta */
  data?: T;
  /** Mensaje de éxito o error */
  message?: string;
  /** Si la operación fue exitosa */
  success: boolean;
  /** Código de error opcional */
  errorCode?: string;
}
