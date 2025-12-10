/**
 * Tipos para Grupos de Estudio
 */

export type StudyGroupLevel = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface IStudyGroup {
  id: string | number;
  name: string;
  subject: string;
  description: string;
  members: number;
  institution: string;
  level: StudyGroupLevel;
  createdAt: string;
  createdBy: number;
  icon: string;
}

export interface IStudyGroupCreate {
  name: string;
  subject: string;
  description: string;
  minMembers: number;
  level: StudyGroupLevel;
}

/**
 * Clase de dominio para Grupo de Estudio
 */
export class StudyGroup implements IStudyGroup {
  constructor(
    public id: string | number,
    public name: string,
    public subject: string,
    public description: string,
    public members: number,
    public institution: string,
    public level: StudyGroupLevel,
    public createdAt: string,
    public createdBy: number,
    public icon: string = '📚'
  ) {}

  static create(data: IStudyGroupCreate, creatorId: number, institution: string): StudyGroup {
    return new StudyGroup(
      Date.now(),
      data.name,
      data.subject,
      data.description,
      data.minMembers,
      institution,
      data.level,
      new Date().toISOString().split('T')[0],
      creatorId,
      '📚'
    );
  }

  static fromJSON(json: IStudyGroup): StudyGroup {
    return new StudyGroup(
      json.id,
      json.name,
      json.subject,
      json.description,
      json.members,
      json.institution,
      json.level,
      json.createdAt,
      json.createdBy,
      json.icon
    );
  }

  toJSON(): IStudyGroup {
    return {
      id: this.id,
      name: this.name,
      subject: this.subject,
      description: this.description,
      members: this.members,
      institution: this.institution,
      level: this.level,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      icon: this.icon,
    };
  }

  addMember(): void {
    this.members += 1;
  }

  removeMember(): void {
    if (this.members > 0) {
      this.members -= 1;
    }
  }

  updateDescription(description: string): void {
    this.description = description;
  }

  matchesSearch(term: string): boolean {
    const searchLower = term.toLowerCase();
    return (
      this.name.toLowerCase().includes(searchLower) ||
      this.description.toLowerCase().includes(searchLower) ||
      this.subject.toLowerCase().includes(searchLower)
    );
  }
}

/**
 * Gestor de grupos de estudio
 */
export class StudyGroupManager {
  private groups: StudyGroup[] = [];

  constructor(initialGroups: IStudyGroup[] = []) {
    this.groups = initialGroups.map(g => StudyGroup.fromJSON(g));
  }

  addGroup(group: StudyGroup): void {
    this.groups.unshift(group);
  }

  removeGroup(groupId: string | number): boolean {
    const index = this.groups.findIndex(g => String(g.id) === String(groupId));
    if (index !== -1) {
      this.groups.splice(index, 1);
      return true;
    }
    return false;
  }

  getById(groupId: string | number): StudyGroup | undefined {
    return this.groups.find(g => String(g.id) === String(groupId));
  }

  getAll(): StudyGroup[] {
    return [...this.groups];
  }

  filterByLevel(level: StudyGroupLevel): StudyGroup[] {
    return this.groups.filter(g => g.level === level);
  }

  filterBySubject(subject: string): StudyGroup[] {
    return this.groups.filter(g => g.subject === subject);
  }

  search(term: string): StudyGroup[] {
    return this.groups.filter(g => g.matchesSearch(term));
  }

  getSubjects(): string[] {
    return Array.from(new Set(this.groups.map(g => g.subject)));
  }

  getTotalMembers(): number {
    return this.groups.reduce((sum, g) => sum + g.members, 0);
  }

  toJSON(): IStudyGroup[] {
    return this.groups.map(g => g.toJSON());
  }
}
