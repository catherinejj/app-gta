import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import type { GetRequestTagByIdDTO } from './GetRequestTagByIdDTO';
import { GetRequestTagByIdValidator } from './GetRequestTagByIdValidator';
import { toRequestTagView, type RequestTagViewDTO } from './RequestTagViewDTO';

export class GetRequestTagByIdUseCase {
  constructor(private readonly requestTagRepository: RequestTagRepository) {}

  async execute(input: GetRequestTagByIdDTO): Promise<RequestTagViewDTO> {
    GetRequestTagByIdValidator.validate(input);

    const requestTag = await this.requestTagRepository.findById(input.id.trim());

    if (!requestTag) {
      throw new Error('Request tag not found');
    }

    return toRequestTagView(requestTag);
  }
}
