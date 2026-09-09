CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"subject" varchar(255),
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "amount" integer;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "loan_type" varchar(100);--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status" varchar(50) DEFAULT 'NEW' NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_programs" ADD COLUMN "rate" numeric(5, 3);--> statement-breakpoint
ALTER TABLE "loan_programs" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "loan_programs" ADD CONSTRAINT "loan_programs_slug_unique" UNIQUE("slug");