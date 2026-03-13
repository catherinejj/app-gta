import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import type { ListRequestTypesDTO } from './ListRequestTypesDTO';
import { ListRequestTypesValidator } from './ListRequestTypesValidator';
import { toRequestTypeView, type RequestTypeViewDTO } from '../GetRequestTypeById/RequestTypeViewDTO';

export class ListRequestTypesUseCase {
  constructor(private readonly requestTypeRepository: RequestTypeRepository) {}

  async execute(input: ListRequestTypesDTO): Promise<RequestTypeViewDTO[]> {
    ListRequestTypesValidator.validate(input);

    const requestTypes = await this.requestTypeRepository.findAll();
    return requestTypes.map(toRequestTypeView);
  }
}
