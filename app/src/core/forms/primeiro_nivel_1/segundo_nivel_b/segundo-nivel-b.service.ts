import { Injectable } from '@nestjs/common';

import { FormService } from '../../../form.abstract.service';
import { FormModel } from '../../../model/form.model';
import { form } from './form';

@Injectable()
export class SegundoNivelBFormService extends FormService {
  protected _id = 'SegundoNivelBFormService';
  protected _label = 'Segundo Nível - B';
  protected _menuPath = ['Primeiro Nível - 1'];
  protected _url = 'https://api.example.com/data';
  protected _payloadFile = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
