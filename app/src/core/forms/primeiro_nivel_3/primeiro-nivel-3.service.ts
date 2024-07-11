import { Injectable } from '@nestjs/common';

import { FormService } from '../../form.abstract.service';
import { FormModel } from '../../model/form.model';
import { form } from './form';

@Injectable()
export class PrimeiroNivelTresFormService extends FormService {
  protected _id = 'PrimeiroNivelTresFormService';
  protected _label = 'Primeiro Nível - 3';
  protected _menuPath = [];
  protected _url = 'https://api.example.com/data';
  protected _payloadFile = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
