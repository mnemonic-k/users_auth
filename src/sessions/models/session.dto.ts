import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
  }
  @ApiProperty({ type: () => String, required: true })
  readonly id: string;

  @ApiProperty({ type: () => String, required: false })
  readonly firstName?: string;

  @ApiProperty({ type: () => String, required: false })
  readonly lastName?: string;

  @ApiProperty({ type: () => String, required: true })
  readonly email: string;
}
