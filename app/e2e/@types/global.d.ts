import { FormService } from '../../src/core/form.abstract.service';

declare global {
  // eslint-disable-next-line no-var
  var __FORM_SERVICES__: FormService[];
  // eslint-disable-next-line no-var
  var __APP__: INestApplication;
}

export {};
