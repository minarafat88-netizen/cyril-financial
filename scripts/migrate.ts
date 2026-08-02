import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';

// Load environment variables from the local .env file
dotenv.config({ path: '.env.development.local' });

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL environment variable is not set. Please run `vercel env pull`.');
}

// Create a new database client specifically for running migrations
const db = drizzle(sql);

async function main() {
  console.log('Running database migrations...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('Migrations completed successfully.');
  // It's crucial to end the connection after the script runs
  await sql.end();
}

main().catch((err) => {
  console.error('An error occurred during migration:', err);
  process.exit(1);
});