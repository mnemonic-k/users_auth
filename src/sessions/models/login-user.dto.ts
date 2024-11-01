import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import {
  ValidationRules,
  EMAIL_VALIDATION_MESSAGE,
} from 'src/common/resources/users/validation.rules';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LoginUserDto {
  @ApiProperty({ type: () => String, required: true })
  @Type(() => String)
  @IsNotEmpty()
  @MaxLength(ValidationRules.maxEmailLength, {
    message: EMAIL_VALIDATION_MESSAGE,
  })
  @IsEmail({}, { message: EMAIL_VALIDATION_MESSAGE })
  readonly email: string;

  @ApiProperty({ type: () => String, required: true })
  @Type(() => String)
  @IsNotEmpty()
  readonly password: string;
}
