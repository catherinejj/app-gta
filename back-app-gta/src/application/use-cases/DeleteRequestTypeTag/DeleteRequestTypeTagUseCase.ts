import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import type { DeleteRequestTypeTagDTO } from './DeleteRequestTypeTagDTO';
import { DeleteRequestTypeTagValidator } from './DeleteRequestTypeTagValidator';

export class DeleteRequestTypeTagUseCase {
  constructor(private readonly requestTypeTagRepository: RequestTypeTagRepository) {}

  async execute(input: DeleteRequestTypeTagDTO): Promise<void> {
    DeleteRequestTypeTagValidator.validate(input);

    const requestTypeTag = await this.requestTypeTagRepository.findByIds(
      input.requestTypeId.trim(),
      input.tagId.trim(),
    );

    if (!requestTypeTag) {
      throw new Error('Request type tag not found');
    }

    await this.requestTypeTagRepository.delete(input.requestTypeId.trim(), input.tagId.trim());
  }
}
