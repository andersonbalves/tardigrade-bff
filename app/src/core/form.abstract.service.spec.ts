/**
 * @jest-environment ./jest.environment.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import { FormService } from './form.abstract.service';
import { FormModel } from './model/form.model';

jest.mock('fs');
jest.mock('path');

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
}

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    service = new MockFormService();
  });

  describe('getAPI', () => {
    it('should return API model when initialized correctly', async () => {
      jest
        .spyOn(service as any, 'validateInitialization')
        .mockResolvedValue(undefined);
      jest.spyOn(service as any, 'readPayloadFile').mockResolvedValue('{}');
      jest
        .spyOn(service as any, 'parsePayload')
        .mockResolvedValue({ key: 'value' });

      const result = await service.getAPI();

      expect(result).toEqual({
        url: service['_url'],
        payload: { key: 'value' },
      });
    });

    it('should throw an error when not initialized', async () => {
      jest
        .spyOn(service as any, 'validateInitialization')
        .mockRejectedValue(new Error('FormService not initialized'));

      await expect(service.getAPI()).rejects.toThrow(
        'FormService not initialized',
      );
    });
  });

  describe('validateInitialization', () => {
    it('should resolve when initialized correctly', async () => {
      await expect(
        (service as any).validateInitialization(),
      ).resolves.toBeUndefined();
    });

    it('should reject when not initialized correctly', async () => {
      (service as any)._url = undefined;
      await expect((service as any).validateInitialization()).rejects.toThrow(
        'FormService not initialized',
      );
    });
  });

  describe('readPayloadFile', () => {
    it('should read the payload file correctly', async () => {
      const mockPath = 'testDir/testPayloadFile.json';
      const mockData = '{"key": "value"}';

      (path.join as jest.Mock).mockReturnValue(mockPath);
      (fs.readFile as unknown as jest.Mock).mockImplementation(
        (path, options, callback) => {
          callback(null, mockData);
        },
      );

      const result = await (service as any).readPayloadFile();

      expect(result).toBe(mockData);
      expect(path.join).toHaveBeenCalledWith(
        service['_dirname'],
        service['_payloadFile'],
      );
    });
  });

  describe('parsePayload', () => {
    it('should parse valid JSON string', () => {
      const data = '{"key": "value"}';
      const result = (service as any).parsePayload(data);

      expect(result).toEqual({ key: 'value' });
    });

    it('should throw an error for invalid JSON string', async () => {
      const data = '{invalid json}';

      await expect((service as any).parsePayload(data)).rejects.toThrow(
        'Failed to parse payload file',
      );
    });
  });

  describe('getters', () => {
    it('should return the correct id', () => {
      expect(service.id).toBe('testId');
    });

    it('should return the correct label', () => {
      expect(service.label).toBe('testLabel');
    });

    it('should return the correct menuPath', () => {
      expect(service.menuPath).toEqual(['test', 'path']);
    });
  });
});
