import { FieldModel } from './field.model';

export interface FormModel {
  path: string;
  name: string;
  fields: Array<FieldModel>;
}
