CREATE TABLE IF NOT EXISTS "mortgage_rates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"rate" real NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
