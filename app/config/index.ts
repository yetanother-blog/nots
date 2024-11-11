import { getConfigDev } from './dev';
import { getConfigProd } from './prod';
import { getConfigTest } from './test';

export interface Config {
  database: {
    url: string;
  };
}

export function getConfig(): Config {
  switch (process.env.NOTS_ENV) {
    case 'production': {
      return getConfigProd();
    }

    case 'development': {
      return getConfigDev();
    }

    case 'test': {
      return getConfigTest();
    }

    default: {
      throw new Error('Invalid NOTS_ENV');
    }
  }
}
