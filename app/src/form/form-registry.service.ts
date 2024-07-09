import { Inject, Injectable } from '@nestjs/common';
import * as mustache from 'mustache';
import { FORM_SERVICE_TOKEN, FormService } from '../core/form.abstract.service';
import { FormModel } from '../core/model/form.model';

@Injectable()
export class FormRegistryService {
  constructor(
    @Inject(FORM_SERVICE_TOKEN) private readonly formServices: FormService[],
  ) {}

  async getFields(requestedApi: string): Promise<FormModel | undefined> {
    const service = this.formServices.find(
      (service) => service.id === requestedApi,
    );
    return service ? service.getForm() : undefined;
  }

  async sendRequest(data: {
    requestedApi: string;
    payload: any;
  }): Promise<any> {
    const service = this.formServices.find(
      (service) => service.id === data.requestedApi,
    );
    const payload = mustache.render(
      JSON.stringify((await service?.getAPI())?.payload),
      data.payload,
    );

    return JSON.parse(payload);
  }
}
