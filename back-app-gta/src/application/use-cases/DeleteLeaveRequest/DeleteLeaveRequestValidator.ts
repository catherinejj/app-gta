import type { DeleteLeaveRequestDTO } from './DeleteLeaveRequestDTO';

export class DeleteLeaveRequestValidator {
  static validate(input: DeleteLeaveRequestDTO): void {
    if (!input.id?.trim()) {
      throw new Error('Leave request id is required');
    }
  }
}
