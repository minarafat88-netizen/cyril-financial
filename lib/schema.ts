import { pgTable, serial, text, varchar, jsonb, timestamp, integer, real, boolean, pgEnum} from 'drizzle-orm/pg-core';

export const loanPrograms = pgTable('loan_programs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  subtitle: text('subtitle'),
  description: text('description'),
  loanType: varchar('loan_type', { length: 50 }),
  defaultInterestRate: real('default_interest_rate'),
  icon: varchar('icon', { length: 50 }),
  benefits: jsonb('benefits').$type<string[]>(),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0),
});

// Applications table schema
export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  loanType: varchar('loan_type', { length: 100 }),
  status: varchar('status', { length: 50 }).default('SUBMITTED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Recent activities table schema
export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Leads table schema
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  message: text('message'),
  source: varchar('source', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// AI knowledge base table schema
export const aiKnowledge = pgTable('ai_knowledge', {
  id: serial('id').primaryKey(),
  keywords: jsonb('keywords').$type<string[]>().notNull(),
  response: text('response').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Define an enum for user roles for better type safety, based on your types/index.ts
export const userRoleEnum = pgEnum('user_role', ['SUPER_ADMIN', 'LOAN_OFFICER', 'PROCESSOR', 'CLIENT']);

// Users table for NextAuth
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }).unique(), // Added phone number field and made it unique
  password: text('password'),
  // Use the enum. The default 'user' is not in your role list, so let's use 'CLIENT'.
  role: userRoleEnum('role').default('CLIENT'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const otps = pgTable('otps', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  code: text('code').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  pendingUserData: jsonb('pending_user_data').$type<{
    name: string;
    phone: string;
    hashedPassword: string;
  }>().notNull(),
});

// Documents table schema
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  applicationId: integer('application_id').references(() => applications.id),
  userId: integer('user_id').references(() => users.id),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: text('file_url').notNull(),
  documentType: varchar('document_type', { length: 100 }).notNull(),
  fileSize: integer('file_size').notNull(),
  status: varchar('status', { length: 50 }).default('UPLOADED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Mortgage rates table schema
export const mortgageRates = pgTable('mortgage_rates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(), // e.g., "30-Year Fixed"
  rate: real('rate').notNull(), // e.g., 6.5
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  // Other relevant fields can be added here, like 'loanProgramId', 'term', 'apr'
});

// Password reset tokens table schema
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }), // Foreign key to users table, deletes tokens if user is deleted
  token: text('token').unique().notNull(), // The unique reset token
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(), // Token expiration time
  used: boolean('used').default(false).notNull(), // Flag to indicate if the token has been used
});

// Inferred types for schema tables
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = User['role'];

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
