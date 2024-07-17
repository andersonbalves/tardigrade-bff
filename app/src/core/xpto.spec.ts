import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs/promises';
import * as mustache from 'mustache';
import { join } from 'path';
import { FormDynamicModule } from './form-dynamic.module';
import { FORM_SERVICE_TOKEN, FormService } from './form.abstract.service';
import { FormModel } from './model/form.model';

let formServices: FormService[];

const initializeServices = async (): Promise<FormService[]> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [await FormDynamicModule.forRoot()],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();

  const services = moduleFixture.get<FormService[]>(FORM_SERVICE_TOKEN);
  await app.close(); // Close the application to avoid interference in further tests

  return services;
};

beforeAll(async () => {
  formServices = await initializeServices();
});

const validateFormModel = (form: FormModel) => {
  expect(form).toHaveProperty('path');
  expect(form).toHaveProperty('name');
  expect(form).toHaveProperty('fields');
  form.fields.forEach((field) => {
    expect(field).toHaveProperty('name');
    expect(field).toHaveProperty('label');
    expect(field).toHaveProperty('type');
    expect(field).toHaveProperty('description');
  });
};

const validatePayloadFile = async (service: FormService, form: FormModel) => {
  const payloadFilePath = join(service['_dirname'], service['_payloadFile']);
  const payloadData = await fs.readFile(payloadFilePath, 'utf8');
  const placeholders = form.fields.map((field) => `{{${field.name}}}`);

  placeholders.forEach((placeholder) => {
    expect(payloadData).toContain(placeholder);
  });

  const sampleData: Record<string, string> = form.fields.reduce(
    (acc: Record<string, string>, field) => {
      acc[field.name] = `sample_${field.name}`;
      return acc;
    },
    {},
  );

  const payload = mustache.render(payloadData, sampleData);

  expect(() => JSON.parse(payload)).not.toThrow();
};

describe('FormService Implementations Validation', () => {
  it('should initialize formServices correctly', async () => {
    expect(formServices.length).toBeGreaterThan(0);
  });

  describe.each(formServices, `${service.id} Implementation`, () => {
    it(`should have all required properties for ${service.id}`, async () => {
      expect(service).toHaveProperty('_id');
      expect(service).toHaveProperty('_label');
      expect(service).toHaveProperty('_menuPath');
      expect(service).toHaveProperty('_url');
      expect(service).toHaveProperty('_payloadFile');
      expect(service).toHaveProperty('_dirname');

      const form = await service.getForm();
      validateFormModel(form);
      await validatePayloadFile(service, form);
    });
  });
});
