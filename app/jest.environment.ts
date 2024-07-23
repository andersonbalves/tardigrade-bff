import { EnvironmentContext } from '@jest/environment';
import { mixinJestEnvironment } from '@stryker-mutator/jest-runner';
import { TestEnvironment } from 'jest-environment-node';

class JestEnvironment extends TestEnvironment {
  constructor(config: any, _context: EnvironmentContext) {
    super(config, _context);
  }

  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = mixinJestEnvironment(JestEnvironment);
