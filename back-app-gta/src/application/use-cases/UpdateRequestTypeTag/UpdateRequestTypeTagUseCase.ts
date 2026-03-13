import { RequestTypeTagRepository } from '../../../domain/repositories/request-type-tag.repository';
import type { UpdateRequestTypeTagDTO } from './UpdateRequestTypeTagDTO';
import { UpdateRequestTypeTagValidator } from './UpdateRequestTypeTagValidator';
import { toRequestTypeTagView, type RequestTypeTagViewDTO } from '../GetRequestTypeTagById/RequestTypeTagViewDTO';

export class UpdateRequestTypeTagUseCase {
  constructor(private readonly requestTypeTagRepository: RequestTypeTagRepository) {}

  async execute(input: UpdateRequestTypeTagDTO): Promise<RequestTypeTagViewDTO> {
    UpdateRequestTypeTagValidator.validate(input);

    const requestTypeTag = await this.requestTypeTagRepository.findByIds(
      input.currentRequestTypeId.trim(),
      input.currentTagId.trim(),
    );

    if (!requestTypeTag) {
      throw new Error('Request type tag not found');
    }

    if (input.requestTypeId !== undefined) {
      requestTypeTag.updateRequestTypeId(input.requestTypeId);
    }

    if (input.tagId !== undefined) {
      requestTypeTag.updateTagId(input.tagId);
    }

    const conflictingRequestTypeTag = await this.requestTypeTagRepository.findByIds(
      requestTypeTag.requestTypeId,
      requestTypeTag.tagId,
    );

    if (
      conflictingRequestTypeTag &&
      (
        conflictingRequestTypeTag.requestTypeId !== input.currentRequestTypeId.trim() ||
        conflictingRequestTypeTag.tagId !== input.currentTagId.trim()
      )
    ) {
      throw new Error('Request type tag already exists');
    }

    const savedRequestTypeTag = await this.requestTypeTagRepository.save(requestTypeTag, {
      requestTypeId: input.currentRequestTypeId.trim(),
      tagId: input.currentTagId.trim(),
    });

    return toRequestTypeTagView(savedRequestTypeTag);
  }
}
