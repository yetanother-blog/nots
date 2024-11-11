import { Config } from ".";

export function getConfigTest(): Config {
  return {
    database: {
      url: 'postgres://postgres:postgres@localhost:9877/nots',
    }
  }
}
