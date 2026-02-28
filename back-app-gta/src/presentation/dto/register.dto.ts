import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@local.test' })
  email!: string;

  @ApiProperty({ example: 'Catherine' })
  firstName!: string;

  @ApiProperty({ example: 'Jules' })
  lastName!: string;

  @ApiProperty({ example: '1996-06-12T00:00:00.000Z' })
  birthDate!: string;

  @ApiProperty({ example: 'MAT-00123', required: false })
  employeeNumber?: string;

  @ApiProperty({ example: 'StrongPass123!' })
  password!: string;
}
