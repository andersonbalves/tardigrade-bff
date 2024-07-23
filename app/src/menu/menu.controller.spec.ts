/**
 * @jest-environment ./jest.environment.ts
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

const mockMenuService = () => ({
  createMenu: jest.fn(),
});

describe('MenuController', () => {
  let controller: MenuController;
  let service: ReturnType<typeof mockMenuService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [
        {
          provide: MenuService,
          useFactory: mockMenuService,
        },
      ],
    }).compile();

    controller = module.get<MenuController>(MenuController);
    service = module.get(MenuService);
  });

  describe('getMenu', () => {
    it('should return menu if service returns menu', async () => {
      const mockMenu = [{ id: '1', name: 'Menu 1' }];
      service.createMenu.mockResolvedValue(mockMenu);

      const result = await controller.getMenu();
      expect(result).toEqual(mockMenu);
      expect(service.createMenu).toHaveBeenCalled();
    });

    it('should throw HttpException if service returns empty menu', async () => {
      service.createMenu.mockResolvedValue([]);

      await expect(controller.getMenu()).rejects.toThrow(
        new HttpException('Menu not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
