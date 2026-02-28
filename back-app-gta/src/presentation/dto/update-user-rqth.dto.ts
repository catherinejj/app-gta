import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRqthDto {
  @ApiProperty({ example: true })
  rqth!: boolean;
}
