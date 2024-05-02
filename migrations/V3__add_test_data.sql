INSERT INTO "Questions" ("Question") VALUES
('If you were a spider, what type of spider would you be?');

INSERT INTO "Spiders" ("Name", "Description", "ImageLink") VALUES
('Black Widow', 'This spider is famous for its hourglass marking on its abdomen and potentially dangerous venom.', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSmkV19iDrpUTP0ZUULyaA0mG1TUACbgiBsMY_mZRPX5Lj5kbnDlfelDLYyR4QG'),
('Wolf Spider', 'Unlike most spiders that spin webs, wolf spiders actively hunt their prey.', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR4IRKt7mixseYfxVwHHQei44HxjcnoBplX_2_U0fPg2YAnCMU608-CD8jmOTJ7'),
('Jumping Spider', 'These spiders have excellent vision and can jump many times their body length.', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTBKq5fqqG8pH-vQHpxIdoujQjgWaWYWLdphrxVpao3PJldMQknKbESqwAYA_z8'),
('Tarantula', 'These large, hairy spiders are often kept as pets.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzxwQzj92ZGYMAAAMAfdOtlg3wJUGm7srKpar3Rj_9p5ZFnJo5QR9oEymC3y2z'),
('Orb-Weaver', 'These spiders are known for their beautiful, symmetrical webs. The Golden Orb-Weaver, also sometimes called the Banana Spider, is a common member of this family.', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRH1Jj4SXn2UFiv3pqBfaljf7UTTcbdbmpyG8fnRUZ792Ipw80rIr-xtGvMOPd_');

INSERT INTO "Options" ("QuestionId", "SpiderId", "Option") VALUES
(0, 0, 'Black Widow'),
(0, 1, 'Wolf Spider'),
(0, 2, 'Jumping Spider'),
(0, 3, 'Tarantula'),
(0, 4, 'Orb-Weaver');

