/**
 * @jest-environment ./jest.environment.ts
 */
import { DynamicModule } from '@nestjs/common';
import * as fs from 'fs';
import { FormDynamicModule } from './form-dynamic.module';
import { FORM_SERVICE_TOKEN } from './form.abstract.service';

jest.mock('fs');
jest.mock('path');

describe('FormDynamicModule', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  describe('loadModule', () => {
    it('should load a module from the specified file path', async () => {
      const filePath = 'test.module.js';
      const TestModule = class TestModule {};
      const TestService = class TestService {};
      const module = { TestModule };

      jest.doMock(filePath, () => module, { virtual: true });
      Reflect.defineMetadata('providers', [TestService], TestModule);

      const result = await (FormDynamicModule as any).loadModule(filePath);

      expect(result).toHaveLength(1);
      expect(result[0].module).toBe(TestModule);
      expect(result[0].providers).toEqual([TestService]);
    });

    it('should throw an error if no module is found', async () => {
      const filePath = 'empty.module.js';
      const module = {};

      jest.doMock(filePath, () => module, { virtual: true });

      await expect(
        (FormDynamicModule as any).loadModule(filePath),
      ).rejects.toThrow(`No module found in ${filePath}`);
    });
  });

  describe('loadImplementationModules', () => {
    it('should load implementation modules from the specified directory', async () => {
      const dir = 'forms';
      const files = ['test.module.js'];

      (fs.readdirSync as jest.Mock).mockReturnValue(files);
      (fs.statSync as jest.Mock).mockReturnValue({ isDirectory: () => false });
      jest.spyOn(FormDynamicModule as any, 'loadModule').mockResolvedValue([
        {
          module: class TestModule {},
          providers: [class TestService {}],
        },
      ]);

      const result = await (FormDynamicModule as any).loadImplementationModules(
        dir,
      );

      expect(result).toHaveLength(1);
      expect(result[0].module.name).toBe('TestModule');
    });
  });

  describe('forRoot', () => {
    it('should return a dynamic module with the expected properties', async () => {
      const mockModules = [
        {
          module: class TestModule {},
          providers: [class TestService {}],
        },
      ];

      jest
        .spyOn(FormDynamicModule as any, 'loadImplementationModules')
        .mockResolvedValue(mockModules);

      const dynamicModule: DynamicModule = await FormDynamicModule.forRoot();

      expect(dynamicModule.module).toBe(FormDynamicModule);
      expect(dynamicModule.imports).toEqual([mockModules[0].module]);
      expect(dynamicModule.providers).toEqual([
        ...mockModules[0].providers,
        {
          provide: FORM_SERVICE_TOKEN,
          useFactory: expect.any(Function),
          inject: mockModules[0].providers,
        },
      ]);
      expect(dynamicModule.exports).toEqual([FORM_SERVICE_TOKEN]);
    });
  });
});
