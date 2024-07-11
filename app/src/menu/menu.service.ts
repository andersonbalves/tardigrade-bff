import { Inject, Injectable } from '@nestjs/common';
import { FORM_SERVICE_TOKEN, FormService } from '../core/form.abstract.service';
import { MenuModel } from '../core/model/menu.model';

@Injectable()
export class MenuService {
  constructor(
    @Inject(FORM_SERVICE_TOKEN) private readonly formServices: FormService[],
  ) {}

  createMenu(): Promise<MenuModel[]> {
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

      return existingMenuItem
        ? menuItems.map((item) =>
            item.label === currentPath
              ? {
                  ...item,
                  action: Array.isArray(item.action)
                    ? addMenuItem(remainingPath, formService, item.action)
                    : [],
                }
              : item,
          )
        : [
            ...menuItems,
            {
              label: currentPath,
              action: addMenuItem(remainingPath, formService, []),
            },
          ];
    };

    const menu = this.formServices.reduce(
      (menuItems, formService) =>
        addMenuItem(formService.menuPath, formService, menuItems),
      [] as MenuModel[],
    );

    return Promise.resolve(menu);
  }
}
