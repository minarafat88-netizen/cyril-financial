import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';

// Use sql from @vercel/postgres to create a connection
// Then pass it to Drizzle ORM
export const db = drizzle(sql, { schema });