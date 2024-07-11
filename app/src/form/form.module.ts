import { Module } from '@nestjs/common';
import { FormDynamicModule } from '../core/form-dynamic.module';
import { FormRegistryService } from './form-registry.service';
import { FormController } from './form.controller';

@Module({
  imports: [FormDynamicModule],
  controllers: [FormController],
  providers: [FormRegistryService],
})
export class FormModule {}
