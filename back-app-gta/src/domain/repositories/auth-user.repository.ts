import { AuthUser } from '../entities/auth-user.entity';

export interface AuthUserRepository {
  findAll(): Promise<AuthUser[]>;
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(id: string): Promise<AuthUser | null>;
  findByFirstName(firstName: string): Promise<AuthUser[]>;
  findByLastName(lastName: string): Promise<AuthUser[]>;
  save(user: AuthUser): Promise<AuthUser>;
}
