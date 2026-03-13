import type { GetLeaveRequestByIdDTO } from './GetLeaveRequestByIdDTO';

export class GetLeaveRequestByIdValidator {
  static validate(input: GetLeaveRequestByIdDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Leave request id is required');
    }
  }
}
