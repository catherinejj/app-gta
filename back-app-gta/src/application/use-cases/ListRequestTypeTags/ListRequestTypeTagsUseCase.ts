import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import type { ListRequestTypeTagsDTO } from './ListRequestTypeTagsDTO';
import { ListRequestTypeTagsValidator } from './ListRequestTypeTagsValidator';
import { toRequestTypeTagView, type RequestTypeTagViewDTO } from '../GetRequestTypeTagById/RequestTypeTagViewDTO';

export class ListRequestTypeTagsUseCase {
  constructor(private readonly requestTypeTagRepository: RequestTypeTagRepository) {}

  async execute(input: ListRequestTypeTagsDTO): Promise<RequestTypeTagViewDTO[]> {
    ListRequestTypeTagsValidator.validate(input);

    const requestTypeTags = await this.requestTypeTagRepository.findAll();
    return requestTypeTags.map(toRequestTypeTagView);
  }
}
