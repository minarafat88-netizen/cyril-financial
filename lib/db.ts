import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

// استخدم sql من @vercel/postgres لإنشاء اتصال
// ثم قم بتمريره إلى Drizzle ORM
export const db = drizzle(sql);