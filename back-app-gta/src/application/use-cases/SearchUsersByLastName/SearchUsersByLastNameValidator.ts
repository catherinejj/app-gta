import type { SearchUsersByLastNameDTO } from './SearchUsersByLastNameDTO';

export class SearchUsersByLastNameValidator {
  static validate(input: SearchUsersByLastNameDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!(input.lastName?.trim().toLowerCase() ?? '')) {
      throw new Error('Last name is required');
    }
  }
}
