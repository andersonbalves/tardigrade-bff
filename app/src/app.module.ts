import { Module } from '@nestjs/common';
import { FormDynamicModule } from './core/form-dynamic.module';
import { FormModule } from './form/form.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [FormDynamicModule.forRoot(), FormModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
