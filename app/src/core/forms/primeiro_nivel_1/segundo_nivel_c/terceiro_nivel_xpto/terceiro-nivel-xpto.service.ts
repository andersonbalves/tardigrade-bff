import { Injectable } from '@nestjs/common';
import fs from 'fs';

import path from 'path';

import { FormService } from '../../../../form.service.interface';
import { FormModel } from '../../../../model/form.model';
import { form } from './form';

@Injectable()
export class SegundoNivelXPTOFormService implements FormService {
  private _id = 'v1/form/primeiro_nivel_1/segundo_nivel_c/terceiro_nivel_xpto';
  private _label = 'Terceiro Nível - XPTO';
  private _menuPath = ['Primeiro Nível - 1', 'Segundo Nível - C'];
  private _url = 'https://api.example.com/data';
  private _filePath = 'payload.json';

  async getForm(): Promise<FormModel | undefined> {
    return form;
  }

  getAPI(): any {
    return {
      url: this._url,
      payload: JSON.parse(
        fs.readFileSync(path.join(__dirname, this._filePath), 'utf8'),
      ),
    };
  }

  get id(): string {
    return this._id;
  }

  get label(): string {
    return this._label;
  }

  get menuPath(): string[] {
    return this._menuPath;
  }
}
