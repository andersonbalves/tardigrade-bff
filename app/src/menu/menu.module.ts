import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
