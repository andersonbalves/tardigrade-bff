import { Injectable } from '@nestjs/common';
import { FormService } from '../../../../form.abstract.service';
import { FormModel } from '../../../../model/form.model';
import { form } from './form';

@Injectable()
export class TerceiroNivelDoisFormService extends FormService {
  protected _id = 'TerceiroNivelDoisFormService';
  protected _label = 'Terceiro Nível - 2';
  protected _menuPath = ['Primeiro Nível - 1', 'Segundo Nível - A'];
  protected _url = 'https://api.example.com/data';
  protected _payloadFile = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
