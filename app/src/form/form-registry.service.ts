import { Inject, Injectable } from '@nestjs/common';
import * as mustache from 'mustache';
import { FORM_SERVICE_TOKEN, FormService } from '../core/form.abstract.service';
import { FormModel } from '../core/model/form.model';

@Injectable()
export class FormRegistryService {
  constructor(
    @Inject(FORM_SERVICE_TOKEN) private readonly formServices: FormService[],
  ) {}

  async getFields(id: string): Promise<FormModel | undefined> {
    return Promise.resolve(
      this.formServices.find((service) => service.id === id)?.getForm(),
    );
  }

  async sendRequest(data: { id: string; payload: any }): Promise<any> {
    return Promise.resolve(
      this.formServices.find((service) => service.id === data.id),
    )
      .then((service) =>
        service
          ? service.getAPI()
          : Promise.reject(new Error('Service not found')),
      )
      .then((api) =>
        mustache.render(JSON.stringify(api?.payload), data.payload),
      )
      .then((renderedPayload) => JSON.parse(renderedPayload));
  }
}
