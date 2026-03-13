import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import type { DeleteRequestTypeDTO } from './DeleteRequestTypeDTO';
import { DeleteRequestTypeValidator } from './DeleteRequestTypeValidator';

export class DeleteRequestTypeUseCase {
  constructor(private readonly requestTypeRepository: RequestTypeRepository) {}

  async execute(input: DeleteRequestTypeDTO): Promise<void> {
    DeleteRequestTypeValidator.validate(input);

    const requestType = await this.requestTypeRepository.findById(input.id.trim());

    if (!requestType) {
      throw new Error('Request type not found');
    }

    await this.requestTypeRepository.delete(input.id.trim());
  }
}
