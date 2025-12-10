/**
 * Clase de Dominio: Credenciales de Usuario
 * Maneja la validación y lógica de credenciales de autenticación
 */

export class UserCredentials {
  private _username: string;
  private _password: string;
  private _email?: string;
  private _institution?: string;

  constructor(data: {
    username: string;
    password: string;
    email?: string;
    institution?: string;
  }) {
    this._username = data.username.trim();
    this._password = data.password;
    this._email = data.email?.trim().toLowerCase();
    this._institution = data.institution?.trim();
  }

  // ==================== GETTERS ====================
  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get email(): string | undefined {
    return this._email;
  }

  get institution(): string | undefined {
    return this._institution;
  }

  // ==================== VALIDACIONES ====================

  /**
   * Valida el formato del nombre de usuario
   * - Mínimo 3 caracteres
   * - Solo alfanuméricos y guiones bajos
   */
  isValidUsername(): boolean {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(this._username);
  }

  /**
   * Valida la fortaleza de la contraseña
   * - Mínimo 6 caracteres
   */
  isValidPassword(): boolean {
    return this._password.length >= 6;
  }

  /**
   * Valida el formato del email
   */
  isValidEmail(): boolean {
    if (!this._email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this._email);
  }

  /**
   * Valida todas las credenciales para login
   */
  isValidForLogin(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidUsername()) {
      errors.push('El nombre de usuario debe tener entre 3 y 20 caracteres alfanuméricos');
    }

    if (!this.isValidPassword()) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Valida todas las credenciales para registro
   */
  isValidForRegister(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidUsername()) {
      errors.push('El nombre de usuario debe tener entre 3 y 20 caracteres alfanuméricos');
    }

    if (!this.isValidPassword()) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }

    if (!this.isValidEmail()) {
      errors.push('El email no tiene un formato válido');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Serializa para enviar al servidor
   */
  toLoginPayload(): { username: string; password: string } {
    return {
      username: this._username,
      password: this._password,
    };
  }

  /**
   * Serializa para registro
   */
  toRegisterPayload(): {
    username: string;
    password: string;
    email: string;
    institution?: string;
  } {
    return {
      username: this._username,
      password: this._password,
      email: this._email!,
      institution: this._institution,
    };
  }
}
