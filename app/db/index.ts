import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { getConfig } from '~/config';

const config = getConfig();

export const db = drizzle({ schema, connection: config.database.url });
