import { Module } from '@nestjs/common';
import { FormDynamicModule } from '../core/form-dynamic.module';
import { FormRegistryService } from './form-registry.service';
import { FormController } from './form.controller';

@Module({
  controllers: [FormController],
  imports: [FormDynamicModule.forRoot()],
  providers: [FormRegistryService],
})
export class FormModule {}
