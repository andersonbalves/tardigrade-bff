import { Injectable } from '@nestjs/common';

import { FormService } from '../../../form.abstract.service';
import { FormModel } from '../../../model/form.model';
import { form } from './form';

@Injectable()
export class SegundoNivelZFormService extends FormService {
  protected _id = 'v1/form/primeiro_nivel_2/segundo_nivel_z';
  protected _label = 'Segundo Nível - Z';
  protected _menuPath = ['Primeiro Nível - 2'];
  protected _url = 'https://api.example.com/data';
  protected _filePath = 'payload.json';
  protected _dirname = __dirname;

  async getForm(): Promise<FormModel> {
    return form;
  }
}
