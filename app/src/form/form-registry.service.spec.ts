import { Test, TestingModule } from '@nestjs/testing';
import * as mustache from 'mustache';
import { FORM_SERVICE_TOKEN, FormService } from '../core/form.abstract.service';
import { FormModel } from '../core/model/form.model';
import { FormRegistryService } from './form-registry.service';

class MockFormService extends FormService {
  protected _id = 'testId';
  protected _label = 'testLabel';
  protected _menuPath = ['test', 'path'];
  protected _url = 'http://test.url';
  protected _payloadFile = 'testPayloadFile.json';
  protected _dirname = 'testDir';

  async getForm(): Promise<FormModel> {
    return Promise.resolve({} as FormModel);
  }

  async getAPI(): Promise<{ url: string; payload: any }> {
    return Promise.resolve({ url: this._url, payload: { key: 'value' } });
  }

  get id(): string {
    return this._id;
  }
}

jest.mock('mustache');

describe('FormRegistryService', () => {
  let service: FormRegistryService;
  let mockFormService: MockFormService;

  beforeEach(async () => {
    const mockFormServiceInstance = new MockFormService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormRegistryService,
        {
          provide: FORM_SERVICE_TOKEN,
          useValue: [mockFormServiceInstance],
        },
      ],
    }).compile();

    service = module.get<FormRegistryService>(FormRegistryService);
  });

  describe('getFields', () => {
    it('should return form model if service is found', async () => {
      const result = await service.getFields('testId');
      expect(result).toEqual({});
    });

    it('should return undefined if service is not found', async () => {
      const result = await service.getFields('nonExistentId');
      expect(result).toBeUndefined();
    });
  });

  describe('sendRequest', () => {
    it('should return rendered payload if service is found', async () => {
      const data = { id: 'testId', payload: { test: 'data' } };
      const renderSpy = jest
        .spyOn(mustache, 'render')
        .mockReturnValue('{"key":"value"}');

      const result = await service.sendRequest(data);
      expect(result).toEqual({ key: 'value' });
      renderSpy.mockRestore();
    });

    it('should throw an error if service is not found', async () => {
      const data = { id: 'nonExistentId', payload: { test: 'data' } };

      await expect(service.sendRequest(data)).rejects.toThrow(
        'Service not found',
      );
    });
  });
});
