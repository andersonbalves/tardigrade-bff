/**
 * @jest-environment ./jest.environment.ts
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FormRegistryService } from './form-registry.service';
import { FormController } from './form.controller';

const mockFormRegistryService = () => ({
  getFields: jest.fn(),
  sendRequest: jest.fn(),
});

describe('FormController', () => {
  let controller: FormController;
  let service: ReturnType<typeof mockFormRegistryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormController],
      providers: [
        {
          provide: FormRegistryService,
          useFactory: mockFormRegistryService,
        },
      ],
    }).compile();

    controller = module.get<FormController>(FormController);
    service = module.get(FormRegistryService);
  });

  describe('findAPIFields', () => {
    it('should return form model if service returns form', async () => {
      const mockForm = { id: 'testId' };
      service.getFields.mockResolvedValue(mockForm);

      const result = await controller.findAPIFields('testId');
      expect(result).toEqual(mockForm);
      expect(service.getFields).toHaveBeenCalledWith('testId');
    });

    it('should throw HttpException if service returns null', async () => {
      service.getFields.mockResolvedValue(undefined);

      await expect(controller.findAPIFields('testId')).rejects.toThrow(
        new HttpException('Form not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('sendRequest', () => {
    it('should return rendered payload if service processes request', async () => {
      const mockForm = { id: 'testId' };
      service.sendRequest.mockResolvedValue(mockForm);

      const result = await controller.sendRequest('testId', { key: 'value' });
      expect(result).toEqual(mockForm);
      expect(service.sendRequest).toHaveBeenCalledWith({
        id: 'testId',
        payload: { key: 'value' },
      });
    });

    it('should throw HttpException if service returns null', async () => {
      service.sendRequest.mockResolvedValue(undefined);

      await expect(
        controller.sendRequest('testId', { key: 'value' }),
      ).rejects.toThrow(
        new HttpException('Form not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
