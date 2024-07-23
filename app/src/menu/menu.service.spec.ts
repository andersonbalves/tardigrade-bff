/**
 * @jest-environment ./jest.environment.ts
 */
import { Test, TestingModule } from '@nestjs/testing';
import { FORM_SERVICE_TOKEN, FormService } from '../core/form.abstract.service';
import { MenuModel } from '../core/model/menu.model';
import { MenuService } from './menu.service';

class MockFormService extends FormService {
  protected _id = 'testId';
  protected _label = 'testLabel';
  protected _menuPath = ['test', 'path'];
  protected _url = 'http://test.url';
  protected _payloadFile = 'testPayloadFile.json';
  protected _dirname = 'testDir';

  async getForm(): Promise<any> {
    return Promise.resolve({});
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

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const mockFormServices = [new MockFormService()];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: FORM_SERVICE_TOKEN,
          useValue: mockFormServices,
        },
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  describe('createMenu', () => {
    it('should create menu based on form services', async () => {
      const menu = await service.createMenu();
      const expectedMenu: MenuModel[] = [
        {
          label: 'test',
          action: [
            {
              label: 'path',
              action: [
                {
                  label: 'testLabel',
                  action: 'testId',
                },
              ],
            },
          ],
        },
      ];
      expect(menu).toEqual(expectedMenu);
    });
  });
});
