import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { InternalErrorFilter } from '../handlers/internal-error.filter';
import { MenuService } from './menu.service';

@Controller('v1/menu')
@UseFilters(new InternalErrorFilter())
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getMenu() {
    return this.menuService
      .createMenu()
      .then((menu) =>
        menu && menu.length > 0
          ? menu
          : Promise.reject(
              new HttpException('Menu not found', HttpStatus.NOT_FOUND),
            ),
      );
  }
}
