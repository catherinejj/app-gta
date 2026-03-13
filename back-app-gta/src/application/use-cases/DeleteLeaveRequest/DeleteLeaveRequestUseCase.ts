import { LeaveRequestRepository } from '../../../domain/repositories/leave-request.repository';
import type { DeleteLeaveRequestDTO } from './DeleteLeaveRequestDTO';
import { DeleteLeaveRequestValidator } from './DeleteLeaveRequestValidator';

export class DeleteLeaveRequestUseCase {
  constructor(private readonly leaveRequestRepository: LeaveRequestRepository) {}

  async execute(input: DeleteLeaveRequestDTO): Promise<void> {
    DeleteLeaveRequestValidator.validate(input);

    const leaveRequest = await this.leaveRequestRepository.findById(input.id.trim());

    if (!leaveRequest) {
      throw new Error('Leave request not found');
    }

    await this.leaveRequestRepository.delete(input.id.trim());
  }
}
