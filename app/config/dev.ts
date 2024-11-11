import { Config } from ".";

export function getConfigDev(): Config {
  return {
    database: {
      url: 'postgres://postgres:postgres@localhost:9876/nots',
    }
  }
}
