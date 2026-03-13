import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import type { GetRequestTypeByIdDTO } from './GetRequestTypeByIdDTO';
import { GetRequestTypeByIdValidator } from './GetRequestTypeByIdValidator';
import { toRequestTypeView, type RequestTypeViewDTO } from './RequestTypeViewDTO';

export class GetRequestTypeByIdUseCase {
  constructor(private readonly requestTypeRepository: RequestTypeRepository) {}

  async execute(input: GetRequestTypeByIdDTO): Promise<RequestTypeViewDTO> {
    GetRequestTypeByIdValidator.validate(input);

    const requestType = await this.requestTypeRepository.findById(input.id.trim());

    if (!requestType) {
      throw new Error('Request type not found');
    }

    return toRequestTypeView(requestType);
  }
}
