import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import type { DeleteRequestTagDTO } from './DeleteRequestTagDTO';
import { DeleteRequestTagValidator } from './DeleteRequestTagValidator';

export class DeleteRequestTagUseCase {
  constructor(private readonly requestTagRepository: RequestTagRepository) {}

  async execute(input: DeleteRequestTagDTO): Promise<void> {
    DeleteRequestTagValidator.validate(input);

    const requestTag = await this.requestTagRepository.findById(input.id.trim());

    if (!requestTag) {
      throw new Error('Request tag not found');
    }

    await this.requestTagRepository.delete(input.id.trim());
  }
}
