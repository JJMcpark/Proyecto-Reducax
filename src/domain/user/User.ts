/**
 * Clase de Dominio: Usuario
 * Representa un usuario del sistema con su lógica de negocio
 */

export type UserRole = 'ESTUDIANTE' | 'DOCENTE' | 'ADMINISTRADOR';

export class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  private _token: string;
  private _avatar?: string;
  private _role: UserRole;
  private _institution?: string;
  private _bio?: string;
  readonly createdAt: Date;

  constructor(data: {
    id: string;
    username: string;
    email: string;
    token: string;
    avatar?: string;
    role?: UserRole;
    institution?: string;
    bio?: string;
    createdAt?: string;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this._token = data.token;
    this._avatar = data.avatar;
    this._role = data.role ?? 'ESTUDIANTE';
    this._institution = data.institution;
    this._bio = data.bio;
    this.createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  }

  // ==================== GETTERS ====================
  get token(): string {
    return this._token;
  }

  get avatar(): string {
    return this._avatar ?? '/default-avatar.png';
  }

  get role(): UserRole {
    return this._role;
  }

  get institution(): string | undefined {
    return this._institution;
  }

  get bio(): string {
    return this._bio ?? 'Sin biografía';
  }

  get displayName(): string {
    return `@${this.username}`;
  }

  // ==================== MÉTODOS DE NEGOCIO ====================

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this._role === 'ADMINISTRADOR';
  }

  /**
   * Verifica si el usuario es docente
   */
  isTeacher(): boolean {
    return this._role === 'DOCENTE';
  }

  /**
   * Verifica si el usuario es estudiante
   */
  isStudent(): boolean {
    return this._role === 'ESTUDIANTE';
  }

  /**
   * Verifica si el usuario puede moderar contenido
   */
  canModerate(): boolean {
    return this.isAdmin() || this.isTeacher();
  }

  /**
   * Verifica si el usuario puede crear anuncios
   */
  canCreateAnnouncements(): boolean {
    return this.isAdmin();
  }

  /**
   * Actualiza el token del usuario
   */
  updateToken(newToken: string): void {
    this._token = newToken;
  }

  /**
   * Actualiza el perfil del usuario
   */
  updateProfile(data: { avatar?: string; bio?: string; institution?: string }): void {
    if (data.avatar) this._avatar = data.avatar;
    if (data.bio) this._bio = data.bio;
    if (data.institution) this._institution = data.institution;
  }

  /**
   * Serializa el usuario para almacenamiento
   */
  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      token: this._token,
      avatar: this._avatar,
      role: this._role,
      institution: this._institution,
      bio: this._bio,
      createdAt: this.createdAt.toISOString(),
    };
  }

  /**
   * Crea una instancia desde datos JSON
   */
  static fromJSON(json: Record<string, unknown>): User {
    return new User({
      id: json.id as string,
      username: json.username as string,
      email: json.email as string,
      token: json.token as string,
      avatar: json.avatar as string | undefined,
      role: json.role as UserRole | undefined,
      institution: json.institution as string | undefined,
      bio: json.bio as string | undefined,
      createdAt: json.createdAt as string | undefined,
    });
  }
}
