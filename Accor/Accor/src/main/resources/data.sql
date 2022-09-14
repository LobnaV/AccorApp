INSERT INTO branch (`id`, `code`)
VALUES (1, 'A1039386');
INSERT INTO `user`(`id`, `first_name`, `last_name`, `password`, `username`)
VALUES (1, 'NePasSupprimer', 'NePasSupprimer', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'nepassupprimer@test.com');
INSERT INTO `company_parameter`(`id`, `dispacher_mail`, `mega_code`, `name`, `branch_id`, `usergm_id`)
VALUES (1, 'nepassupprimer@test.com', 'H12456', 'Luxe Hotet', 1, 1);
INSERT INTO `role`(`id`, `name`) VALUES (1,'ROLE_GM');
INSERT INTO `users_roles`(`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO `staff`(`first_name`, `last_name`, `mail`, `company_parameter_id`)
VALUES ('staff1', 'hotel1', 'staff1@test.com', 1);
INSERT INTO `staff`(`first_name`, `last_name`, `mail`, `company_parameter_id`)
VALUES ('staff2', 'hotel2', 'staff2@test.com', 1);
INSERT INTO `staff`(`first_name`, `last_name`, `mail`, `company_parameter_id`)
VALUES ('staff3', 'hotel3', 'staff3@test.com', 1);
INSERT INTO `staff`(`first_name`, `last_name`, `mail`, `company_parameter_id`)
VALUES ('staff4', 'hotel4', 'staff4@test.com', 1);
INSERT INTO `staff`(`first_name`, `last_name`, `mail`, `company_parameter_id`)
VALUES ('staff5', 'hotel5', 'staff5@test.com', 1);
