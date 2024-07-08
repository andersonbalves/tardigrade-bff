import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { MenuService } from './menu.service';

@Controller('v1/menu')
export class MenuController {
  constructor(private menuService: MenuService) {}
  @Get()
  async getMenu(@Res() res: Response) {
    return this.menuService
      .createMenu()
      .then((menu) =>
        menu && menu.length > 0
          ? res.status(HttpStatus.OK).json(menu)
          : res.sendStatus(HttpStatus.NOT_FOUND),
      )
      .catch(() => res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
  }
}
