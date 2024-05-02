ALTER TABLE "Options" ADD CONSTRAINT FK_questions FOREIGN KEY ("QuestionId") REFERENCES "Questions" ("QuestionId");

ALTER TABLE "Options" ADD CONSTRAINT FK_spiders FOREIGN KEY ("SpiderId") REFERENCES "Spiders" ("SpiderId");