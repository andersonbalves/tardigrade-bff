import * as fs from 'fs';
import * as path from 'path';
import { FormModel } from './model/form.model';

export const FORM_SERVICE_TOKEN = Symbol('FormService');
export abstract class FormService {
  protected abstract _id: string;
  protected abstract _label: string;
  protected abstract _menuPath: string[];
  protected abstract _url: string;
  protected abstract _filePath: string;
  protected abstract _dirname: string;

  abstract getForm(): Promise<FormModel>;

  async getAPI(): Promise<ApiModel> {
    if (this._url === undefined || this._filePath === undefined)
      throw new Error('FormService not initialized');
    console.log(this._dirname, this._filePath);
    return {
      url: this._url,
      payload: JSON.parse(
        fs.readFileSync(path.join(this._dirname, this._filePath), 'utf8'),
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

export interface ApiModel {
  url: string;
  payload: any;
}
