import { ApiProperty } from '@nestjs/swagger';
import { FieldModel } from './field.model';

export class FormModel {
  @ApiProperty()
  path: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: [FieldModel] })
  fields: Array<FieldModel>;
}
