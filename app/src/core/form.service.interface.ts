import { FormModel } from './model/form.model';

export const FORM_SERVICE_TOKEN = Symbol('FormService');

export interface FormService {
  get id(): string;
  get label(): string;
  get menuPath(): string[];
  getForm(): Promise<FormModel | undefined>;
  getAPI(): any;
}
