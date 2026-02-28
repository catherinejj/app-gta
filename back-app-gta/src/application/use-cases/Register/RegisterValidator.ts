import type { RegisterDTO } from './RegisterDTO';

export class RegisterValidator {
  static validate(input: RegisterDTO): void {
    if (!(input.email?.trim().toLowerCase() ?? '').includes('@')) {
      throw new Error('Invalid email');
    }

    if (!(input.firstName?.trim().toLowerCase() ?? '')) {
      throw new Error('First name is required');
    }

    if (!(input.lastName?.trim().toLowerCase() ?? '')) {
      throw new Error('Last name is required');
    }

    const birthDate = new Date(input.birthDate);
    if (Number.isNaN(birthDate.getTime())) {
      throw new Error('Birth date is invalid');
    }

    if (input.employeeNumber !== undefined && !input.employeeNumber.trim()) {
      throw new Error('Employee number is required');
    }

    if (!input.password?.trim()) {
      throw new Error('Password is required');
    }
  }
}
