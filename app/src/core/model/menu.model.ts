import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class MenuModel {
  @ApiProperty()
  label: string;
  @ApiProperty({
    anyOf: [
      { type: 'string' },
      { type: 'array', items: { $ref: getSchemaPath(MenuModel) } },
    ],
  })
  action: string | Array<MenuModel>;
}
