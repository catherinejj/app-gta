import { RequestTypeRepository } from '../../../domain/repositories/request-type.repository';
import type { UpdateRequestTypeDTO } from './UpdateRequestTypeDTO';
import { UpdateRequestTypeValidator } from './UpdateRequestTypeValidator';
import { toRequestTypeView, type RequestTypeViewDTO } from '../GetRequestTypeById/RequestTypeViewDTO';

export class UpdateRequestTypeUseCase {
  constructor(private readonly requestTypeRepository: RequestTypeRepository) {}

  async execute(input: UpdateRequestTypeDTO): Promise<RequestTypeViewDTO> {
    UpdateRequestTypeValidator.validate(input);

    const requestType = await this.requestTypeRepository.findById(input.id.trim());

    if (!requestType) {
      throw new Error('Request type not found');
    }

    if (input.code !== undefined) {
      requestType.updateCode(input.code);
    }

    if (input.label !== undefined) {
      requestType.updateLabel(input.label);
    }

    if (input.description !== undefined) {
      requestType.updateDescription(input.description);
    }

    if (input.category !== undefined) {
      requestType.updateCategory(input.category);
    }

    if (input.parentId !== undefined) {
      requestType.updateParentId(input.parentId);
    }

    if (input.requiresApproval !== undefined) {
      requestType.updateRequiresApproval(input.requiresApproval);
    }

    if (input.requiresBalance !== undefined) {
      requestType.updateRequiresBalance(input.requiresBalance);
    }

    if (input.requiresDocument !== undefined) {
      requestType.updateRequiresDocument(input.requiresDocument);
    }

    if (input.rqthOnly !== undefined) {
      requestType.updateRqthOnly(input.rqthOnly);
    }

    if (input.requiresTeleworkEligibility !== undefined) {
      requestType.updateRequiresTeleworkEligibility(input.requiresTeleworkEligibility);
    }

    if (input.color !== undefined) {
      requestType.updateColor(input.color);
    }

    if (input.icon !== undefined) {
      requestType.updateIcon(input.icon);
    }

    if (input.displayOrder !== undefined) {
      requestType.updateDisplayOrder(input.displayOrder);
    }

    if (input.isActive !== undefined) {
      requestType.updateIsActive(input.isActive);
    }

    const conflictingRequestType = await this.requestTypeRepository.findByCode(requestType.code);

    if (conflictingRequestType && conflictingRequestType.id !== requestType.id) {
      throw new Error('Request type already exists for this code');
    }

    const savedRequestType = await this.requestTypeRepository.save(requestType);
    return toRequestTypeView(savedRequestType);
  }
}
