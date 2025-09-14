CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progressdata" (
	"id" serial PRIMARY KEY NOT NULL,
	"uname" text NOT NULL,
	"item" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userdata" (
	"id" serial PRIMARY KEY NOT NULL,
	"uname" text NOT NULL,
	"unum" text NOT NULL,
	"udob" text NOT NULL
);
