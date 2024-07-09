import { Inject, Injectable } from '@nestjs/common';
import {
  FORM_SERVICE_TOKEN,
  FormService,
} from '../core/form.service.interface';
import { MenuModel } from '../core/model/menu.model';

@Injectable()
export class MenuService {
  constructor(
    @Inject(FORM_SERVICE_TOKEN) private readonly formServices: FormService[],
  ) {}

  createMenu = async (): Promise<MenuModel[]> => {
    const addMenuItem = (
      path: string[],
      formService: FormService,
      menuItems: MenuModel[],
    ): MenuModel[] => {
      if (path.length === 0) {
        return [
          ...menuItems,
          {
            label: formService.label,
            action: formService.id,
          },
        ];
      }

      const [currentPath, ...remainingPath] = path;
      const existingMenuItem = menuItems.find(
        (item) => item.label === currentPath,
      );

      if (existingMenuItem) {
        return menuItems.map((item) =>
          item.label === currentPath
            ? {
                ...item,
                action: Array.isArray(item.action)
                  ? addMenuItem(remainingPath, formService, item.action)
                  : [],
              }
            : item,
        );
      }

      return [
        ...menuItems,
        {
          label: currentPath,
          action: addMenuItem(remainingPath, formService, []),
        },
      ];
    };

    return this.formServices.reduce(
      (menuItems, formService) =>
        addMenuItem(formService.menuPath, formService, menuItems),
      [] as MenuModel[],
    );
  };
}
