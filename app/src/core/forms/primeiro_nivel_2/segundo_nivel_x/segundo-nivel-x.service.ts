import { Injectable } from '@nestjs/common';

import { FormService } from '../../../form.abstract.service';
import { FormModel } from '../../../model/form.model';
import { form } from './form';

@Injectable()
export class SegundoNivelXFormService extends FormService {
  protected _id = 'SegundoNivelXFormService';
  protected _label = 'Segundo Nível - X';
  protected _menuPath = ['Primeiro Nível - 2'];
  protected _url = 'https://api.example.com/data';
  protected _payloadFile = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
