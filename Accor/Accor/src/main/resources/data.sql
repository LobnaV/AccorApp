INSERT INTO branch (id)
VALUES ('1039386');
INSERT INTO `user`(`id`, `first_name`, `last_name`, `password`, `username`)
VALUES (1, 'NePasSupprimer', 'NePasSupprimer', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'nepassupprimer@test.com');
INSERT INTO `company_parameter`(`dispacher_mail`, `mega_code`, `name`, `branch_id`, `usergm_id`)
VALUES ('nepassupprimer@test.com', 'H12456', 'Luxe Hotet', 1039386, 1);
