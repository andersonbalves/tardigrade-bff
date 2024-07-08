import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FormModule } from './form/form.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [EventEmitterModule.forRoot(), FormModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
