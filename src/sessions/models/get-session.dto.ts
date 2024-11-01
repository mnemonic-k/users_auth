import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindSessionDto {
  @ApiProperty({ type: () => String, required: true })
  @Type(() => String)
  @IsNotEmpty()
  readonly accessToken: string;
}
