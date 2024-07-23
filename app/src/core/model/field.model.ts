import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FieldModel {
  @ApiProperty()
  name: string;
  @ApiProperty()
  label: string;
  @ApiProperty()
  required: boolean;
  @ApiProperty()
  type:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  @ApiPropertyOptional()
  default?: any;
  @ApiPropertyOptional()
  description?: string;
  @ApiPropertyOptional()
  minLength?: number;
  @ApiPropertyOptional()
  maxLength?: number;
}
