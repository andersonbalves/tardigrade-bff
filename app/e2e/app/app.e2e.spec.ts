/**
 * @jest-environment ./e2e/jest.environment.ts
 */
import request from 'supertest'; // Alterar para importação padrão

describe('AppModule (integration)', () => {
  beforeAll(async () => {
    await global.__APP__.init();
  });

  afterAll(async () => {
    await global.__APP__.close();
  });

  it('/form (GET) should return a form', async () => {
    return request(global.__APP__.getHttpServer())
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

  it('/menu (GET) should return the menu', async () => {
    return request(global.__APP__.getHttpServer())
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
