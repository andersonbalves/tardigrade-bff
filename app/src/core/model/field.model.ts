export interface FieldModel {
  name: string;
  label: string;
  required: boolean;
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
  default?: any;
  description?: string;
  minLength?: number;
  maxLength?: number;
}
