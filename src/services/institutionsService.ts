/**
 * Servicio para Instituciones Educativas
 * Usa localStorage para persistencia
 */

import type { Institution, CreateInstitutionData } from '../types';
import { createInstitution } from '../utils/helpers';

const STORAGE_KEY = 'reducax_institutions';

// Datos iniciales de ejemplo
const initialInstitutions: Institution[] = [
  {
    id: 1,
    name: 'Universidad Central',
    location: 'Lima, Perú',
    description: 'Universidad líder en investigación y formación profesional con más de 50 años de experiencia.',
    students: 15000,
    professors: 800,
    groups: 45,
    rating: 4.5,
    icon: '🏛️',
    createdAt: '2020-01-01',
  },
  {
    id: 2,
    name: 'Instituto Tecnológico',
    location: 'Arequipa, Perú',
    description: 'Formación técnica de alta calidad en tecnologías de la información y desarrollo de software.',
    students: 5000,
    professors: 200,
    groups: 28,
    rating: 4.3,
    icon: '🖥️',
    createdAt: '2015-06-15',
  },
  {
    id: 3,
    name: 'Centro de Idiomas',
    location: 'Cusco, Perú',
    description: 'Especialistas en enseñanza de idiomas con metodología comunicativa moderna.',
    students: 2000,
    professors: 50,
    groups: 15,
    rating: 4.7,
    icon: '🌍',
    createdAt: '2018-03-20',
  },
  {
    id: 4,
    name: 'Academia de Ciencias',
    location: 'Trujillo, Perú',
    description: 'Preparación universitaria y reforzamiento académico en ciencias exactas.',
    students: 3500,
    professors: 120,
    groups: 22,
    rating: 4.4,
    icon: '🔬',
    createdAt: '2019-08-10',
  },
];

/**
 * Obtiene las instituciones del localStorage
 */
const getStoredInstitutions = (): Institution[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInstitutions));
      return initialInstitutions;
    }
    return JSON.parse(stored);
  } catch {
    return initialInstitutions;
  }
};

/**
 * Guarda las instituciones en localStorage
 */
const saveInstitutions = (institutions: Institution[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(institutions));
};

const institutionsService = {
  /**
   * Obtiene todas las instituciones
   */
  getInstitutions: async (): Promise<Institution[]> => {
    return getStoredInstitutions();
  },

  /**
   * Obtiene una institución por ID
   */
  getInstitutionById: async (id: string | number): Promise<Institution | null> => {
    const institutions = getStoredInstitutions();
    return institutions.find(i => String(i.id) === String(id)) || null;
  },

  /**
   * Crea una nueva institución
   */
  createInstitution: async (data: CreateInstitutionData): Promise<Institution> => {
    const institutions = getStoredInstitutions();
    const newInstitution = createInstitution(data) as Institution;
    institutions.unshift(newInstitution);
    saveInstitutions(institutions);
    return newInstitution;
  },

  /**
   * Actualiza una institución
   */
  updateInstitution: async (id: string | number, updates: Partial<Institution>): Promise<Institution | null> => {
    const institutions = getStoredInstitutions();
    const index = institutions.findIndex(i => String(i.id) === String(id));
    if (index === -1) return null;
    
    institutions[index] = { ...institutions[index], ...updates };
    saveInstitutions(institutions);
    return institutions[index];
  },

  /**
   * Elimina una institución
   */
  deleteInstitution: async (id: string | number): Promise<boolean> => {
    const institutions = getStoredInstitutions();
    const index = institutions.findIndex(i => String(i.id) === String(id));
    if (index === -1) return false;
    
    institutions.splice(index, 1);
    saveInstitutions(institutions);
    return true;
  },

  /**
   * Busca instituciones por término
   */
  searchInstitutions: async (term: string): Promise<Institution[]> => {
    const institutions = getStoredInstitutions();
    const searchTerm = term.toLowerCase();
    return institutions.filter(i => 
      i.name.toLowerCase().includes(searchTerm) ||
      i.location.toLowerCase().includes(searchTerm) ||
      i.description.toLowerCase().includes(searchTerm)
    );
  },

  /**
   * Ordena instituciones por rating
   */
  sortByRating: async (): Promise<Institution[]> => {
    const institutions = getStoredInstitutions();
    return [...institutions].sort((a, b) => b.rating - a.rating);
  },

  /**
   * Ordena instituciones por cantidad de estudiantes
   */
  sortByStudents: async (): Promise<Institution[]> => {
    const institutions = getStoredInstitutions();
    return [...institutions].sort((a, b) => b.students - a.students);
  },
};

export default institutionsService;
