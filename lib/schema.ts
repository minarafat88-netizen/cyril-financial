import { pgTable, serial, text, varchar, jsonb, timestamp, integer, real, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { primaryKey } from 'drizzle-orm/pg-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const loanPrograms = pgTable('loan_programs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  loanType: varchar('loan_type', { length: 50 }),
  defaultInterestRate: real('default_interest_rate'),
  icon: varchar('icon', { length: 100 }),
  benefits: jsonb('benefits').$type<string[]>(),
  imageUrl: text('image_url'),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Applications table schema
export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  loanType: varchar('loan_type', { length: 100 }),
  status: varchar('status', { length: 50 }).default('SUBMITTED').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Recent activities table schema
export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Leads table schema
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
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

// Define an enum for user roles for better type safety
export const userRoleEnum = pgEnum('user_role', ['SUPER_ADMIN', 'LOAN_OFFICER', 'PROCESSOR', 'CLIENT']);

// Users table for NextAuth (معرّف نصي متوافق مع Drizzle Adapter)
export const users = pgTable('user', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  phone: varchar('phone', { length: 50 }).unique(),
  password: text('password'),
  role: userRoleEnum('role').default('CLIENT'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// جدول الحسابات الخاص بـ NextAuth لربط مزودي الخدمة مثل Google
export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

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
  userId: text('user_id').references(() => users.id),
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
  name: varchar('name', { length: 255 }).notNull(),
  rate: real('rate').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

// Password reset tokens table schema
export const passwordResetTokens = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').unique().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  used: boolean('used').default(false).notNull(),
});

// Inferred types for schema tables
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserRole = User['role'];

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;