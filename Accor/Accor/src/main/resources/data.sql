INSERT INTO branch (`id`, `code`, `name`, `uuid`)
VALUES (1, 'A9015701','Branche1', '5a7efe9a-340d-4fea-b316-4ecb207260ff');
INSERT INTO `user`(`id`, `first_name`, `last_name`, `password`, `username`, `primary_branch`)
VALUES (1, 'Lobna', 'Lobna', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H1032@gmail.com', 'A9015701');
INSERT INTO `company_parameter`(`id`, `dispacher_mail`, `mega_code`, `name`, `branch_id`, `usergm_id`)
VALUES (1, 'ps.accor+H1032@gmail.com', '02320.H1032', 'Luxe Hotel', 1, 1);
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
