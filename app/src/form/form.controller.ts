import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { InternalErrorFilter } from '../handlers/internal-error.filter';
import { FormRegistryService } from './form-registry.service';

@Controller('v1/form')
@UseFilters(new InternalErrorFilter())
export class FormController {
  constructor(private formRegistryService: FormRegistryService) {}

  @Get(':id')
  async findAPIFields(@Param('id') id: string) {
    return this.formRegistryService
      .getFields(id)
      .then((form) =>
        form
          ? form
          : Promise.reject(
              new HttpException('Form not found', HttpStatus.NOT_FOUND),
            ),
      );
  }

  @Post(':id')
  @UseFilters(new InternalErrorFilter())
  async sendRequest(@Param('id') id: string, @Body() body: any) {
    return this.formRegistryService
      .sendRequest({ id, payload: body })
      .then((form) =>
        form
          ? form
          : Promise.reject(
              new HttpException('Form not found', HttpStatus.NOT_FOUND),
            ),
      );
  }
}
