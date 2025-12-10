/**
 * Tipos de Instituciones Educativas
 * @module types/institution
 */

/**
 * Representa una institución educativa
 */
export interface Institution {
  /** ID único de la institución */
  id: string | number;
  /** Nombre de la institución */
  name: string;
  /** Ubicación/ciudad */
  location: string;
  /** Descripción */
  description: string;
  /** Cantidad de estudiantes */
  students: number;
  /** Cantidad de profesores */
  professors: number;
  /** Cantidad de grupos */
  groups: number;
  /** Calificación (0-5) */
  rating: number;
  /** Icono/emoji */
  icon: string;
  /** Fecha de creación */
  createdAt: string;
}

/**
 * Datos para crear una nueva institución
 */
export interface CreateInstitutionData {
  /** Nombre de la institución */
  name: string;
  /** Ubicación */
  location: string;
  /** Descripción */
  description: string;
}
