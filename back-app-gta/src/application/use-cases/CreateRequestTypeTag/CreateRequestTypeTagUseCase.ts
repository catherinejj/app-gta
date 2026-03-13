import { RequestTypeTag } from '../../../domain/entities/request-type-tag.entity';
import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import type { CreateRequestTypeTagDTO } from './CreateRequestTypeTagDTO';
import { CreateRequestTypeTagValidator } from './CreateRequestTypeTagValidator';
import { toRequestTypeTagView, type RequestTypeTagViewDTO } from '../GetRequestTypeTagById/RequestTypeTagViewDTO';

export class CreateRequestTypeTagUseCase {
  constructor(private readonly requestTypeTagRepository: RequestTypeTagRepository) {}

  async execute(input: CreateRequestTypeTagDTO): Promise<RequestTypeTagViewDTO> {
    CreateRequestTypeTagValidator.validate(input);

    const existingRequestTypeTag = await this.requestTypeTagRepository.findByIds(
      input.requestTypeId.trim(),
      input.tagId.trim(),
    );

    if (existingRequestTypeTag) {
      throw new Error('Request type tag already exists');
    }

    const requestTypeTag = RequestTypeTag.create({
      requestTypeId: input.requestTypeId.trim(),
      tagId: input.tagId.trim(),
    });

    const savedRequestTypeTag = await this.requestTypeTagRepository.save(requestTypeTag);
    return toRequestTypeTagView(savedRequestTypeTag);
  }
}
