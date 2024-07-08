import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MenuModel } from './model/menu.model';
@Injectable()
export class MenuService {
  constructor(private eventEmitter: EventEmitter2) {}
  createMenu = async (): Promise<MenuModel[]> => {
    return [
      {
        label: 'Primeiro Nível - 1',
        action: [
          {
            label: 'Segundo Nível - A',
            action: [
              {
                label: 'Terceiro Nível - 1',
                action:
                  'v1/form/primeiro_nivel_1/segundo_nivel_a/terceiro_nivel_1',
              },
              {
                label: 'Terceiro Nível - 2',
                action:
                  'v1/form/primeiro_nivel_1/segundo_nivel_a/terceiro_nivel_2',
              },
            ],
          },
          {
            label: 'Segundo Nível - B',
            action: 'v1/form/primeiro_nivel_1/segundo_nivel_b',
          },
          {
            label: 'Segundo Nível - C',
            action: [
              {
                label: 'Terceiro Nível - XPTO',
                action:
                  'v1/form/primeiro_nivel_1/segundo_nivel_c/terceiro_nivel_xpto',
              },
            ],
          },
        ],
      },
      {
        label: 'Primeiro Nível - 2',
        action: [
          {
            label: 'Segundo Nível - X',
            action: 'v1/form/primeiro_nivel_2/segundo_nivel_x',
          },
          {
            label: 'Segundo Nível - Z',
            action: 'v1/form/primeiro_nivel_2/segundo_nivel_z',
          },
        ],
      },
      {
        label: 'Primeiro Nível - 3',
        action: 'v1/form/primeiro_nivel_3',
      },
    ];
  };
}
