import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { FORM_SERVICE_TOKEN } from './form.abstract.service';

interface ImplementationModule {
  module: Type<any>;
  providers: Type<any>[];
}

@Global()
@Module({})
export class FormDynamicModule {
  static async forRoot(): Promise<DynamicModule> {
    const implementationModules =
      await FormDynamicModule.loadImplementationModules(
        join(__dirname, 'forms'),
      );

    return {
      module: FormDynamicModule,
      imports: implementationModules.map(({ module }) => module),
      providers: [
        ...implementationModules.flatMap(({ providers }) => providers),
        {
          provide: FORM_SERVICE_TOKEN,
          useFactory: (...implementations: any[]) => implementations,
          inject: implementationModules.flatMap(({ providers }) => providers),
        },
      ],
      exports: [FORM_SERVICE_TOKEN],
    };
  }

  private static async loadImplementationModules(
    dir: string,
  ): Promise<ImplementationModule[]> {
    return Promise.all(
      readdirSync(dir).map(async (file) => {
        const fullPath = join(dir, file);
        if (statSync(fullPath).isDirectory()) {
          return this.loadImplementationModules(fullPath);
        } else if (file.endsWith('.module.js') || file.endsWith('.module.ts')) {
          return this.loadModule(fullPath);
        }
        return [];
      }),
    ).then((modules) => modules.flat());
  }

  private static async loadModule(
    filePath: string,
  ): Promise<ImplementationModule[]> {
    const module = await import(filePath);
    const exportedModule = Object.values(module).find(
      (m) => typeof m === 'function' && m.name.endsWith('Module'),
    ) as Type<any>;

    if (!exportedModule) {
      throw new Error(`No module found in ${filePath}`);
    }

    const providers = Reflect.getMetadata('providers', exportedModule) || [];
    return [
      {
        module: exportedModule,
        providers: providers.map((p: any) =>
          typeof p === 'function' ? p : p.provide,
        ),
      },
    ];
  }
}
