import { pgTable, serial, text, varchar, jsonb, timestamp, integer, real} from 'drizzle-orm/pg-core';

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

// مخطط جدول طلبات التقديم
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

// مخطط جدول الأنشطة الأخيرة
export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// مخطط جدول العملاء المحتملين (Leads)
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  message: text('message'),
  source: varchar('source', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// مخطط جدول قاعدة المعرفة للذكاء الاصطناعي
export const aiKnowledge = pgTable('ai_knowledge', {
  id: serial('id').primaryKey(),
  keywords: jsonb('keywords').$type<string[]>().notNull(),
  response: text('response').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 👈 جدول المستخدمين المطلوب لعمل NextAuth (تمت إضافته لمنع خطأ الاستيراد)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }).unique(), // إضافة حقل رقم الهاتف وجعله فريداً
  password: text('password'),
  role: varchar('role', { length: 50 }).default('user'),
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

// مخطط جدول المستندات
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

// مخطط جدول أسعار الرهن العقاري
export const mortgageRates = pgTable('mortgage_rates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(), // على سبيل المثال: "30-Year Fixed"
  rate: real('rate').notNull(), // على سبيل المثال: 6.5
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  // يمكن إضافة حقول أخرى ذات صلة هنا، مثل 'loanProgramId', 'term', 'apr'
});