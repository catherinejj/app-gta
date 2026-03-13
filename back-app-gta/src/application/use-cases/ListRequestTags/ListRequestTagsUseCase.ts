import { RequestTagRepository } from '../../../domain/repositories/request-tag.repository';
import type { ListRequestTagsDTO } from './ListRequestTagsDTO';
import { ListRequestTagsValidator } from './ListRequestTagsValidator';
import { toRequestTagView, type RequestTagViewDTO } from '../GetRequestTagById/RequestTagViewDTO';

export class ListRequestTagsUseCase {
  constructor(private readonly requestTagRepository: RequestTagRepository) {}

  async execute(input: ListRequestTagsDTO): Promise<RequestTagViewDTO[]> {
    ListRequestTagsValidator.validate(input);

    const requestTags = await this.requestTagRepository.findAll();
    return requestTags.map(toRequestTagView);
  }
}
