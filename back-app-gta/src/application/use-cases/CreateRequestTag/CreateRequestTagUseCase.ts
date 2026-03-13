import { RequestTag } from '../../../domain/entities/request-tag.entity';
import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import type { CreateRequestTagDTO } from './CreateRequestTagDTO';
import { CreateRequestTagValidator } from './CreateRequestTagValidator';
import { toRequestTagView, type RequestTagViewDTO } from '../GetRequestTagById/RequestTagViewDTO';

export class CreateRequestTagUseCase {
  constructor(private readonly requestTagRepository: RequestTagRepository) {}

  async execute(input: CreateRequestTagDTO): Promise<RequestTagViewDTO> {
    CreateRequestTagValidator.validate(input);

    const normalizedCode = input.code.trim().toUpperCase();
    const existingRequestTag = await this.requestTagRepository.findByCode(normalizedCode);

    if (existingRequestTag) {
      throw new Error('Request tag already exists for this code');
    }

    const requestTag = RequestTag.create({
      code: normalizedCode,
      label: input.label,
      color: input.color,
    });

    const savedRequestTag = await this.requestTagRepository.save(requestTag);
    return toRequestTagView(savedRequestTag);
  }
}
