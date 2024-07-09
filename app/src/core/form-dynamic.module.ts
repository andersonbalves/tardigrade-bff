import { DynamicModule, Module, Type } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { FORM_SERVICE_TOKEN } from './form.abstract.service';

interface ImplementationModule {
  module: Type<any>;
  providers: Type<any>[];
}

@Module({})
export class FormDynamicModule {
  static async forRoot(): Promise<DynamicModule> {
    const implementationModules = await this.loadImplementationModules(
      join(__dirname, 'forms'),
    );

    const dynamicModule: DynamicModule = {
      module: FormDynamicModule,
      imports: implementationModules.map((m) => m.module),
      providers: [
        ...implementationModules.flatMap((m) => m.providers),
        {
          provide: FORM_SERVICE_TOKEN,
          useFactory: (...implementations: any[]) => implementations,
          inject: implementationModules.flatMap((m) => m.providers),
        },
      ],
      exports: [FORM_SERVICE_TOKEN],
    };

    return dynamicModule;
  }

  private static async loadImplementationModules(
    dir: string,
  ): Promise<ImplementationModule[]> {
    const modules: ImplementationModule[] = [];
    const files = readdirSync(dir);

    for (const file of files) {
      const fullPath = join(dir, file);
      if (statSync(fullPath).isDirectory()) {
        const subModules = await this.loadImplementationModules(fullPath);
        modules.push(...subModules);
      } else if (file.endsWith('.module.js')) {
        const module = await import(fullPath);
        const exportedModule = Object.values(module).find(
          (m) => typeof m === 'function' && m.name.endsWith('Module'),
        ) as Type<any>;

        if (!exportedModule) {
          throw new Error(`No module found in ${file}`);
        }

        const providers =
          Reflect.getMetadata('providers', exportedModule) || [];
        modules.push({
          module: exportedModule,
          providers: providers.map((p: any) =>
            typeof p === 'function' ? p : p.provide,
          ),
        });
      }
    }

    return modules;
  }
}
