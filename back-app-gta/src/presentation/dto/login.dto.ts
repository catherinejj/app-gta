import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@local.test' })
  email!: string;

  @ApiProperty({ example: 'StrongPass123!' })
  password!: string;
}
