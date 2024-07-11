import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { FormModel } from './model/form.model';

const readFileAsync = promisify(fs.readFile);

export const FORM_SERVICE_TOKEN = Symbol('FormService');
export abstract class FormService {
  protected abstract _id: string;
  protected abstract _label: string;
  protected abstract _menuPath: string[];
  protected abstract _url: string;
  protected abstract _payloadFile: string;
  protected abstract _dirname: string;

  abstract getForm(): Promise<FormModel>;

  async getAPI(): Promise<ApiModel> {
    return this.validateInitialization()
      .then(() => this.readPayloadFile())
      .then((data) => this.parsePayload(data))
      .then((payload) => ({ url: this._url, payload }));
  }

  private async validateInitialization(): Promise<void> {
    return this._url && this._payloadFile
      ? Promise.resolve()
      : Promise.reject(new Error('FormService not initialized'));
  }

  private async readPayloadFile(): Promise<string> {
    const payloadFilePath = path.join(this._dirname, this._payloadFile);
    return readFileAsync(payloadFilePath, 'utf8');
  }

  private parsePayload(data: string): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      return Promise.reject(new Error('Failed to parse payload file'));
    }
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
