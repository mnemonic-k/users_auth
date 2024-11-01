import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  EMAIL_VALIDATION_MESSAGE,
  ValidationRules,
  PASSWORD_LENGTH_CRITERIA_MESSAGE,
} from 'src/common/resources/users/validation.rules';

export class CreateUserDto {
  @ApiProperty({ type: () => String, required: false })
  @Type(() => String)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly firstName?: string;

  @ApiProperty({ type: () => String, required: false })
  @Type(() => String)
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly lastName?: string;

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
  @Length(
    ValidationRules.minPasswordLength,
    ValidationRules.maxPasswordLength,
    { message: PASSWORD_LENGTH_CRITERIA_MESSAGE },
  )
  readonly password: string;
}
