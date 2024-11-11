import env from 'env-var';
import { Config } from '.';

export function getConfigProd(): Config {
  return {
    database: {
      url: env.get('DATABASE_URL').required().asString(),
    },
  };
}
