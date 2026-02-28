import type { ListUsersDTO } from './ListUsersDTO';

export class ListUsersValidator {
  static validate(input: ListUsersDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }
  }
}
