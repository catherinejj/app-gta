import { RequestType } from '../../../domain/entities/request-type.entity';
import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import type { CreateRequestTypeDTO } from './CreateRequestTypeDTO';
import { CreateRequestTypeValidator } from './CreateRequestTypeValidator';
import { toRequestTypeView, type RequestTypeViewDTO } from '../GetRequestTypeById/RequestTypeViewDTO';

export class CreateRequestTypeUseCase {
  constructor(private readonly requestTypeRepository: RequestTypeRepository) {}

  async execute(input: CreateRequestTypeDTO): Promise<RequestTypeViewDTO> {
    CreateRequestTypeValidator.validate(input);

    const normalizedCode = input.code.trim().toUpperCase();
    const existingRequestType = await this.requestTypeRepository.findByCode(normalizedCode);

    if (existingRequestType) {
      throw new Error('Request type already exists for this code');
    }

    const requestType = RequestType.create({
      code: normalizedCode,
      label: input.label,
      description: input.description,
      category: input.category,
      parentId: input.parentId,
      requiresApproval: input.requiresApproval,
      requiresBalance: input.requiresBalance,
      requiresDocument: input.requiresDocument,
      rqthOnly: input.rqthOnly,
      requiresTeleworkEligibility: input.requiresTeleworkEligibility,
      color: input.color,
      icon: input.icon,
      displayOrder: input.displayOrder,
      isActive: input.isActive,
    });

    const savedRequestType = await this.requestTypeRepository.save(requestType);
    return toRequestTypeView(savedRequestType);
  }
}
