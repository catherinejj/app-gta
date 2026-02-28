import { UserRole, isUserRole } from '../value-objects/user-role';

export class AuthUser {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    private firstNameValue: string,
    private lastNameValue: string,
    private birthDateValue: Date,
    private employeeNumberValue: string,
    private rqthValue: boolean,
    private userCreatedAtValue: Date,
    private userUpdatedAtValue: Date,
    private lastLoginAtValue: Date | null,
    private lastLogoutAtValue: Date | null,
    private passwordHashValue: string,
    private roleValue: UserRole,
    private refreshTokenHashValue: string | null,
  ) {}

  static create(params: {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    employeeNumber?: string;
    rqth?: boolean;
    userCreatedAt?: Date;
    userUpdatedAt?: Date;
    lastLoginAt?: Date | null;
    lastLogoutAt?: Date | null;
    passwordHash: string;
    role?: UserRole;
  }): AuthUser {
    const id = params.id?.trim() ?? '';
    const email = AuthUser.normalizeWord(params.email);
    const firstName = AuthUser.normalizeWord(params.firstName);
    const lastName = AuthUser.normalizeWord(params.lastName);
    const birthDate = params.birthDate;
    const employeeNumber = params.employeeNumber?.trim() || '123';
    const rqth = params.rqth ?? false;
    const userCreatedAt = params.userCreatedAt ?? new Date();
    const userUpdatedAt = params.userUpdatedAt ?? new Date();

    if (!email || !email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!firstName) {
      throw new Error('First name is required');
    }
    if (!lastName) {
      throw new Error('Last name is required');
    }
    if (!(birthDate instanceof Date) || Number.isNaN(birthDate.getTime())) {
      throw new Error('Birth date is invalid');
    }
    if (!employeeNumber) {
      throw new Error('Employee number is required');
    }
    if (typeof rqth !== 'boolean') {
      throw new Error('Invalid rqth status');
    }
    if (!params.passwordHash?.trim()) {
      throw new Error('Password hash is required');
    }
    if (params.role && !isUserRole(params.role)) {
      throw new Error('Invalid role');
    }

    return new AuthUser(
      id,
      email,
      firstName,
      lastName,
      birthDate,
      employeeNumber,
      rqth,
      userCreatedAt,
      userUpdatedAt,
      AuthUser.normalizeOptionalDate(params.lastLoginAt),
      AuthUser.normalizeOptionalDate(params.lastLogoutAt),
      params.passwordHash,
      params.role ?? 'USER',
      null,
    );
  }

  static rehydrate(params: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    employeeNumber: string;
    rqth: boolean;
    userCreatedAt: Date;
    userUpdatedAt: Date;
    lastLoginAt?: Date | null;
    lastLogoutAt?: Date | null;
    passwordHash: string;
    role: UserRole;
    refreshTokenHash?: string | null;
  }): AuthUser {
    const id = params.id?.trim();

    if (!id) {
      throw new Error('User id is required');
    }

    return AuthUser.create({
      id,
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      birthDate: params.birthDate,
      employeeNumber: params.employeeNumber,
      rqth: params.rqth,
      userCreatedAt: params.userCreatedAt,
      userUpdatedAt: params.userUpdatedAt,
      lastLoginAt: params.lastLoginAt,
      lastLogoutAt: params.lastLogoutAt,
      passwordHash: params.passwordHash,
      role: params.role,
    }).withRefreshTokenHash(params.refreshTokenHash ?? null);
  }

  private withRefreshTokenHash(refreshTokenHash: string | null): AuthUser {
    this.refreshTokenHashValue = refreshTokenHash;
    return this;
  }

  get firstName(): string {
    return this.firstNameValue;
  }

  get lastName(): string {
    return this.lastNameValue;
  }

  get birthDate(): Date {
    return this.birthDateValue;
  }

  get employeeNumber(): string {
    return this.employeeNumberValue;
  }

  get rqth(): boolean {
    return this.rqthValue;
  }

  get userCreatedAt(): Date {
    return this.userCreatedAtValue;
  }

  get userUpdatedAt(): Date {
    return this.userUpdatedAtValue;
  }

  get lastLoginAt(): Date | null {
    return this.lastLoginAtValue;
  }

  get lastLogoutAt(): Date | null {
    return this.lastLogoutAtValue;
  }

  get passwordHash(): string {
    return this.passwordHashValue;
  }

  get role(): UserRole {
    return this.roleValue;
  }

  get refreshTokenHash(): string | null {
    return this.refreshTokenHashValue;
  }

  changeRole(role: UserRole): void {
    this.roleValue = role;
  }

  updateRqth(rqth: boolean): void {
    if (typeof rqth !== 'boolean') {
      throw new Error('Invalid rqth status');
    }

    this.rqthValue = rqth;
  }

  updateRefreshTokenHash(refreshTokenHash: string): void {
    if (!refreshTokenHash?.trim()) {
      throw new Error('Refresh token hash is required');
    }

    this.refreshTokenHashValue = refreshTokenHash;
  }

  setLastLoginAt(date: Date): void {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new Error('Invalid login date');
    }

    this.lastLoginAtValue = date;
  }

  setLastLogoutAt(date: Date): void {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new Error('Invalid logout date');
    }

    this.lastLogoutAtValue = date;
  }

  clearRefreshTokenHash(): void {
    this.refreshTokenHashValue = null;
  }

  private static normalizeWord(value: string): string {
    return value?.trim().toLowerCase() ?? '';
  }

  private static normalizeOptionalDate(value?: Date | null): Date | null {
    if (value == null) {
      return null;
    }

    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error('Invalid date');
    }

    return value;
  }
}
