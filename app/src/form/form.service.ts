import { Injectable } from '@nestjs/common';
import { FormModel } from './model/form.model';

@Injectable()
export class FormService {
  getFields = async (requestedApi: string): Promise<FormModel | undefined> => {
    return import(`./forms/${requestedApi}/form`)
      .then((form) => form.default as FormModel)
      .catch((error) =>
        error.code === 'MODULE_NOT_FOUND' ? undefined : error,
      );
  };
}
