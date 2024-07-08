import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FormService } from './form.service';

@Controller('v1/form')
export class FormController {
  constructor(private apisService: FormService) {}

  @Get('*')
  async findAPIFields(@Req() req: Request, @Res() res: Response) {
    const requestedApi = req.url.replace('/v1/form/', '');
    return this.apisService
      .getFields(requestedApi)
      .then((form) =>
        form
          ? res.status(HttpStatus.OK).send(form)
          : res.sendStatus(HttpStatus.NOT_FOUND),
      )
      .catch(() => res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR));
  }
}
