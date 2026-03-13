import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import type { GetRequestTypeTagByIdDTO } from './GetRequestTypeTagByIdDTO';
import { GetRequestTypeTagByIdValidator } from './GetRequestTypeTagByIdValidator';
import { toRequestTypeTagView, type RequestTypeTagViewDTO } from './RequestTypeTagViewDTO';

export class GetRequestTypeTagByIdUseCase {
  constructor(private readonly requestTypeTagRepository: RequestTypeTagRepository) {}

  async execute(input: GetRequestTypeTagByIdDTO): Promise<RequestTypeTagViewDTO> {
    GetRequestTypeTagByIdValidator.validate(input);

    const requestTypeTag = await this.requestTypeTagRepository.findByIds(
      input.requestTypeId.trim(),
      input.tagId.trim(),
    );

    if (!requestTypeTag) {
      throw new Error('Request type tag not found');
    }

    return toRequestTypeTagView(requestTypeTag);
  }
}
