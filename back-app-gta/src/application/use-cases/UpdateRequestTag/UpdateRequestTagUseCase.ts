import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import type { UpdateRequestTagDTO } from './UpdateRequestTagDTO';
import { UpdateRequestTagValidator } from './UpdateRequestTagValidator';
import { toRequestTagView, type RequestTagViewDTO } from '../GetRequestTagById/RequestTagViewDTO';

export class UpdateRequestTagUseCase {
  constructor(private readonly requestTagRepository: RequestTagRepository) {}

  async execute(input: UpdateRequestTagDTO): Promise<RequestTagViewDTO> {
    UpdateRequestTagValidator.validate(input);

    const requestTag = await this.requestTagRepository.findById(input.id.trim());

    if (!requestTag) {
      throw new Error('Request tag not found');
    }

    if (input.code !== undefined) {
      requestTag.updateCode(input.code);
    }

    if (input.label !== undefined) {
      requestTag.updateLabel(input.label);
    }

    if (input.color !== undefined) {
      requestTag.updateColor(input.color);
    }

    const conflictingRequestTag = await this.requestTagRepository.findByCode(requestTag.code);

    if (conflictingRequestTag && conflictingRequestTag.id !== requestTag.id) {
      throw new Error('Request tag already exists for this code');
    }

    const savedRequestTag = await this.requestTagRepository.save(requestTag);
    return toRequestTagView(savedRequestTag);
  }
}
