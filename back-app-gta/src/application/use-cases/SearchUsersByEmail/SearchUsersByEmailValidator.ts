import type { SearchUsersByEmailDTO } from './SearchUsersByEmailDTO';

export class SearchUsersByEmailValidator {
  static validate(input: SearchUsersByEmailDTO): void {
    if (!input.accessToken?.trim()) {
      throw new Error('Access token is required');
    }

    if (!(input.email?.trim().toLowerCase() ?? '').includes('@')) {
      throw new Error('Invalid email');
    }
  }
}
