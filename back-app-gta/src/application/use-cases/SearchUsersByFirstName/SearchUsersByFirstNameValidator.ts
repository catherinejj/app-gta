import type { SearchUsersByFirstNameDTO } from './SearchUsersByFirstNameDTO';

export class SearchUsersByFirstNameValidator {
  static validate(input: SearchUsersByFirstNameDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!(input.firstName?.trim().toLowerCase() ?? '')) {
      throw new Error('First name is required');
    }
  }
}
