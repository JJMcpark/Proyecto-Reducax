/**
 * Servicio para Grupos de Estudio
 * Usa localStorage para persistencia
 */

import { 
  StudyGroup, 
  StudyGroupManager, 
  type IStudyGroup, 
  type IStudyGroupCreate 
} from '../domain';

const STORAGE_KEY = 'reducax_study_groups';

// Datos iniciales de ejemplo
const initialGroups: IStudyGroup[] = [
  {
    id: 1,
    name: 'Matemáticas Avanzadas',
    subject: 'Matemáticas',
    description: 'Grupo para estudiar cálculo diferencial e integral',
    members: 15,
    institution: 'Universidad Central',
    level: 'Avanzado',
    createdAt: '2024-01-15',
    createdBy: 1,
    icon: '📐',
  },
  {
    id: 2,
    name: 'Programación Web',
    subject: 'Programación',
    description: 'Aprendemos React, TypeScript y desarrollo frontend moderno',
    members: 22,
    institution: 'Instituto Tecnológico',
    level: 'Intermedio',
    createdAt: '2024-01-20',
    createdBy: 2,
    icon: '💻',
  },
  {
    id: 3,
    name: 'Física Básica',
    subject: 'Física',
    description: 'Grupo de estudio para mecánica clásica y termodinámica',
    members: 12,
    institution: 'Universidad Central',
    level: 'Principiante',
    createdAt: '2024-02-01',
    createdBy: 1,
    icon: '⚡',
  },
  {
    id: 4,
    name: 'Inglés Conversacional',
    subject: 'Idiomas',
    description: 'Práctica de conversación en inglés nivel B2-C1',
    members: 8,
    institution: 'Centro de Idiomas',
    level: 'Intermedio',
    createdAt: '2024-02-10',
    createdBy: 3,
    icon: '🌍',
  },
];

/**
 * Obtiene los grupos del localStorage
 */
const getStoredGroups = (): IStudyGroup[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialGroups));
      return initialGroups;
    }
    return JSON.parse(stored);
  } catch {
    return initialGroups;
  }
};

/**
 * Guarda los grupos en localStorage
 */
const saveGroups = (groups: IStudyGroup[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
};

const groupsService = {
  /**
   * Obtiene todos los grupos
   */
  getGroups: async (): Promise<StudyGroup[]> => {
    const groups = getStoredGroups();
    return groups.map(g => StudyGroup.fromJSON(g));
  },

  /**
   * Obtiene un grupo por ID
   */
  getGroupById: async (id: string | number): Promise<StudyGroup | null> => {
    const groups = getStoredGroups();
    const group = groups.find(g => String(g.id) === String(id));
    return group ? StudyGroup.fromJSON(group) : null;
  },

  /**
   * Crea un nuevo grupo
   */
  createGroup: async (data: IStudyGroupCreate, userId: number): Promise<StudyGroup> => {
    const groups = getStoredGroups();
    const newGroup = StudyGroup.create(data, userId, 'Mi Institución');
    groups.unshift(newGroup.toJSON());
    saveGroups(groups);
    return newGroup;
  },

  /**
   * Actualiza un grupo
   */
  updateGroup: async (id: string | number, updates: Partial<IStudyGroup>): Promise<StudyGroup | null> => {
    const groups = getStoredGroups();
    const index = groups.findIndex(g => String(g.id) === String(id));
    if (index === -1) return null;
    
    groups[index] = { ...groups[index], ...updates };
    saveGroups(groups);
    return StudyGroup.fromJSON(groups[index]);
  },

  /**
   * Elimina un grupo
   */
  deleteGroup: async (id: string | number): Promise<boolean> => {
    const groups = getStoredGroups();
    const index = groups.findIndex(g => String(g.id) === String(id));
    if (index === -1) return false;
    
    groups.splice(index, 1);
    saveGroups(groups);
    return true;
  },

  /**
   * Agrega un usuario a un grupo (incrementa miembros)
   */
  joinGroup: async (groupId: string | number): Promise<StudyGroup | null> => {
    const groups = getStoredGroups();
    const index = groups.findIndex(g => String(g.id) === String(groupId));
    if (index === -1) return null;
    
    groups[index].members += 1;
    saveGroups(groups);
    return StudyGroup.fromJSON(groups[index]);
  },

  /**
   * Remueve un usuario de un grupo (decrementa miembros)
   */
  leaveGroup: async (groupId: string | number): Promise<StudyGroup | null> => {
    const groups = getStoredGroups();
    const index = groups.findIndex(g => String(g.id) === String(groupId));
    if (index === -1) return null;
    
    if (groups[index].members > 0) {
      groups[index].members -= 1;
    }
    saveGroups(groups);
    return StudyGroup.fromJSON(groups[index]);
  },

  /**
   * Obtiene el manager de grupos
   */
  getManager: (): StudyGroupManager => {
    const groups = getStoredGroups();
    return new StudyGroupManager(groups);
  },
};

export default groupsService;
export type { StudyGroup, IStudyGroup, IStudyGroupCreate };
