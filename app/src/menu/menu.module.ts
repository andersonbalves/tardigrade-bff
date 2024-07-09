import { Module } from '@nestjs/common';
import { FormDynamicModule } from '../core/form-dynamic.module';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [FormDynamicModule.forRoot()],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
