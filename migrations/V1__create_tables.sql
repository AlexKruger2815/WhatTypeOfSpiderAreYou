CREATE TABLE "Questions" (
  "QuestionId" SERIAL PRIMARY KEY NOT NULL,
  "Question" varchar(255) NOT NULL,
);

CREATE TABLE "Options" (
  "OptionId" SERIAL PRIMARY KEY NOT NULL,
  "QuestionId" bigint NOT NULL,
  "SpiderId" bigint NOT NULL,
  "Option" varchar(255) NOT NULL,
);

CREATE TABLE "Spiders" (
  "SpiderId" SERIAL PRIMARY KEY NOT NULL,
  "Name" varchar(255) NOT NULL,
  "Description" varchar(255) NOT NULL,
  "ImageLink" varchar(255) NOT NULL,
);