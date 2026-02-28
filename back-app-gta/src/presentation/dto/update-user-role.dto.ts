import { ApiProperty } from '@nestjs/swagger';
import type { UserRole } from '../../domain/value-objects/user-role';

export class UpdateUserRoleDto {
  @ApiProperty({ enum: ['ADMIN', 'USER', 'MANAGER', 'RH'] })
  role!: UserRole;
}
