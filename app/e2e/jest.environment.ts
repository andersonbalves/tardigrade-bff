import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  FORM_SERVICE_TOKEN,
  FormService,
} from '../src/core/form.abstract.service';

import { EnvironmentContext } from '@jest/environment';
import { mixinJestEnvironment } from '@stryker-mutator/jest-runner';
import { TestEnvironment } from 'jest-environment-node';

class JestE2eEnvironment extends TestEnvironment {
  constructor(config: any, _context: EnvironmentContext) {
    super(config, _context);
  }

  async setup() {
    await super.setup();
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.global.__APP__ = moduleFixture.createNestApplication();
    this.global.__FORM_SERVICES__ =
      moduleFixture.get<FormService[]>(FORM_SERVICE_TOKEN);
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = mixinJestEnvironment(JestE2eEnvironment);
