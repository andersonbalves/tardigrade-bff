import { Injectable } from '@nestjs/common';

import { FormService } from '../../../../form.abstract.service';
import { FormModel } from '../../../../model/form.model';
import { form } from './form';

@Injectable()
export class SegundoNivelXPTOFormService extends FormService {
  protected _id = 'SegundoNivelXPTOFormService';
  protected _label = 'Terceiro Nível - XPTO';
  protected _menuPath = ['Primeiro Nível - 1', 'Segundo Nível - C'];
  protected _url = 'https://api.example.com/data';
  protected _payloadFile = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
