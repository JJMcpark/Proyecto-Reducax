/**
 * Tipos de Grupos de Estudio
 * @module types/group
 */

/**
 * Niveles disponibles para grupos de estudio
 */
export type StudyGroupLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

/**
 * Representa un grupo de estudio
 */
export interface StudyGroup {
  /** ID único del grupo */
  id: string | number;
  /** Nombre del grupo */
  name: string;
  /** Materia o tema */
  subject: string;
  /** Descripción del grupo */
  description: string;
  /** Cantidad de miembros */
  members: number;
  /** Institución a la que pertenece */
  institution: string;
  /** Nivel del grupo */
  level: StudyGroupLevel;
  /** Fecha de creación */
  createdAt: string;
  /** ID del creador */
  createdBy: number;
  /** Icono/emoji del grupo */
  icon: string;
}

/**
 * Datos para crear un nuevo grupo
 */
export interface CreateStudyGroupData {
  /** Nombre del grupo */
  name: string;
  /** Materia o tema */
  subject: string;
  /** Descripción */
  description: string;
  /** Cantidad mínima de miembros */
  minMembers: number;
  /** Nivel del grupo */
  level: StudyGroupLevel;
}
