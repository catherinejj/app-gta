import type { LoginDTO } from './LoginDTO';

export class LoginValidator {
  static validate(input: LoginDTO): void {
    if (!(input.email?.trim().toLowerCase() ?? '').includes('@')) {
      throw new Error('Invalid email');
    }

    if (!input.password?.trim()) {
      throw new Error('Password is required');
    }
  }
}
