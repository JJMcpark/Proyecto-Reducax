/**
 * Tipos para Instituciones Educativas
 */

export interface IInstitution {
  id: string | number;
  name: string;
  location: string;
  description: string;
  students: number;
  professors: number;
  groups: number;
  rating: number;
  icon: string;
  createdAt: string;
}

export interface IInstitutionCreate {
  name: string;
  location: string;
  description: string;
}

/**
 * Clase de dominio para Institución
 */
export class Institution implements IInstitution {
  constructor(
    public id: string | number,
    public name: string,
    public location: string,
    public description: string,
    public students: number,
    public professors: number,
    public groups: number,
    public rating: number,
    public icon: string,
    public createdAt: string
  ) {}

  static create(data: IInstitutionCreate): Institution {
    return new Institution(
      Date.now(),
      data.name,
      data.location,
      data.description,
      0, // students
      0, // professors
      0, // groups
      0, // rating
      '🏛️', // icon
      new Date().toISOString().split('T')[0]
    );
  }

  static fromJSON(json: IInstitution): Institution {
    return new Institution(
      json.id,
      json.name,
      json.location,
      json.description,
      json.students,
      json.professors,
      json.groups,
      json.rating,
      json.icon,
      json.createdAt
    );
  }

  toJSON(): IInstitution {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      description: this.description,
      students: this.students,
      professors: this.professors,
      groups: this.groups,
      rating: this.rating,
      icon: this.icon,
      createdAt: this.createdAt,
    };
  }

  addStudent(): void {
    this.students += 1;
  }

  addProfessor(): void {
    this.professors += 1;
  }

  addGroup(): void {
    this.groups += 1;
  }

  updateRating(newRating: number): void {
    this.rating = Math.min(5, Math.max(0, newRating));
  }

  matchesSearch(term: string): boolean {
    const searchLower = term.toLowerCase();
    return (
      this.name.toLowerCase().includes(searchLower) ||
      this.location.toLowerCase().includes(searchLower) ||
      this.description.toLowerCase().includes(searchLower)
    );
  }

  getTotalMembers(): number {
    return this.students + this.professors;
  }
}

/**
 * Gestor de instituciones
 */
export class InstitutionManager {
  private institutions: Institution[] = [];

  constructor(initialInstitutions: IInstitution[] = []) {
    this.institutions = initialInstitutions.map(i => Institution.fromJSON(i));
  }

  addInstitution(institution: Institution): void {
    this.institutions.unshift(institution);
  }

  removeInstitution(institutionId: string | number): boolean {
    const index = this.institutions.findIndex(i => String(i.id) === String(institutionId));
    if (index !== -1) {
      this.institutions.splice(index, 1);
      return true;
    }
    return false;
  }

  getById(institutionId: string | number): Institution | undefined {
    return this.institutions.find(i => String(i.id) === String(institutionId));
  }

  getAll(): Institution[] {
    return [...this.institutions];
  }

  search(term: string): Institution[] {
    return this.institutions.filter(i => i.matchesSearch(term));
  }

  getTotalStudents(): number {
    return this.institutions.reduce((sum, i) => sum + i.students, 0);
  }

  getTotalProfessors(): number {
    return this.institutions.reduce((sum, i) => sum + i.professors, 0);
  }

  toJSON(): IInstitution[] {
    return this.institutions.map(i => i.toJSON());
  }
}
