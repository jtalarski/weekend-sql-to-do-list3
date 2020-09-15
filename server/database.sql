CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(256),
	"status" VARCHAR(20) DEFAULT 'open'
	);
	
INSERT INTO "tasks" ("task") VALUES ('Complete weekend challenge');
INSERT INTO "tasks" ("task") VALUES ('Make Costco run');
INSERT INTO "tasks" ("task") VALUES ('Make Target run');
INSERT INTO "tasks" ("task") VALUES ('Grocery shop');
INSERT INTO "tasks" ("task") VALUES ('Clean kitchen');
INSERT INTO "tasks" ("task") VALUES ('Laundry');
