import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config({ path: '.env.development.local' });

const dbUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('Database URL environment variable is not set.');
}

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl, 
  },
} satisfies Config;