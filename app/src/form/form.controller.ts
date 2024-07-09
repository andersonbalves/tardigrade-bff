import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FormRegistryService } from './form-registry.service';

@Controller('v1/form')
export class FormController {
  constructor(private formRegistryService: FormRegistryService) {}

  @Get('*')
  async findAPIFields(@Req() req: Request, @Res() res: Response) {
    const requestedApi = req.url.replace('/', '');
    try {
      const form = await this.formRegistryService.getFields(requestedApi);
      return form
        ? res.status(HttpStatus.OK).send(form)
        : res.sendStatus(HttpStatus.NOT_FOUND);
    } catch {
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('*')
  async sendRequest(@Req() req: Request, @Res() res: Response) {
    const requestedApi = req.url.replace('/', '');
    try {
      const form = await this.formRegistryService.sendRequest({
        requestedApi,
        payload: req.body,
      });
      return form
        ? res.status(HttpStatus.OK).send(form)
        : res.sendStatus(HttpStatus.NOT_FOUND);
    } catch {
      return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
