/**
 * Servicio para Instituciones Educativas
 * Usa localStorage para persistencia
 */

import { 
  Institution, 
  InstitutionManager, 
  type IInstitution, 
  type IInstitutionCreate 
} from '../domain';

const STORAGE_KEY = 'reducax_institutions';

// Datos iniciales de ejemplo
const initialInstitutions: IInstitution[] = [
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
const getStoredInstitutions = (): IInstitution[] => {
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
const saveInstitutions = (institutions: IInstitution[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(institutions));
};

const institutionsService = {
  /**
   * Obtiene todas las instituciones
   */
  getInstitutions: async (): Promise<Institution[]> => {
    const institutions = getStoredInstitutions();
    return institutions.map(i => Institution.fromJSON(i));
  },

  /**
   * Obtiene una institución por ID
   */
  getInstitutionById: async (id: string | number): Promise<Institution | null> => {
    const institutions = getStoredInstitutions();
    const institution = institutions.find(i => String(i.id) === String(id));
    return institution ? Institution.fromJSON(institution) : null;
  },

  /**
   * Crea una nueva institución
   */
  createInstitution: async (data: IInstitutionCreate): Promise<Institution> => {
    const institutions = getStoredInstitutions();
    const newInstitution = Institution.create(data);
    institutions.unshift(newInstitution.toJSON());
    saveInstitutions(institutions);
    return newInstitution;
  },

  /**
   * Actualiza una institución
   */
  updateInstitution: async (id: string | number, updates: Partial<IInstitution>): Promise<Institution | null> => {
    const institutions = getStoredInstitutions();
    const index = institutions.findIndex(i => String(i.id) === String(id));
    if (index === -1) return null;
    
    institutions[index] = { ...institutions[index], ...updates };
    saveInstitutions(institutions);
    return Institution.fromJSON(institutions[index]);
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
    const manager = new InstitutionManager(institutions);
    return manager.search(term);
  },

  /**
   * Obtiene el manager de instituciones
   */
  getManager: (): InstitutionManager => {
    const institutions = getStoredInstitutions();
    return new InstitutionManager(institutions);
  },
};

export default institutionsService;
export type { Institution, IInstitution, IInstitutionCreate };
