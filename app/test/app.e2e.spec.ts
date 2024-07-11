import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest'; // Alterar para importação padrão
import { AppModule } from '../src/app.module';

describe('AppModule (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/form (GET) should return a form', () => {
    return request(app.getHttpServer())
      .get('/v1/form/TerceiroNivelUmFormService')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toHaveProperty('path');
        expect(typeof res.body.path).toBe('string');
        expect(res.body).toHaveProperty('name');
        expect(typeof res.body.name).toBe('string');
        expect(res.body).toHaveProperty('fields');
        expect(res.body.fields).toBeInstanceOf(Array);
        expect(res.body.fields.length).toBeGreaterThan(1);
        res.body.fields.forEach((field: any) => {
          expect(field).toHaveProperty('name');
          expect(typeof field.name).toBe('string');
          expect(field).toHaveProperty('label');
          expect(typeof field.label).toBe('string');
          expect(field).toHaveProperty('required');
          expect(typeof field.required).toBe('boolean');
          expect(field).toHaveProperty('type');
          expect(typeof field.type).toBe('string');
        });
      });
  });

  it('/menu (GET) should return the menu', () => {
    return request(app.getHttpServer())
      .get('/v1/menu')
      .expect(200)
      .expect((res: request.Response) => {
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(1);
        res.body.forEach((item: any) => {
          validateMenyModelType(item);
        });
      });
  });

  const validateMenyModelType = (obj: any) => {
    expect(typeof obj).toBe('object');
    expect(obj).not.toBe(null);
    expect(typeof obj.label).toBe('string');
    expect(
      typeof obj.action === 'string' || obj.action instanceof Array,
    ).toBeTruthy();

    if (Array.isArray(obj.action)) {
      obj.action.forEach((item: any) => {
        validateMenyModelType(item);
      });
    }
  };
});
