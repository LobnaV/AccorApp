INSERT INTO branch (`id`, `code`, `name`, `perimeter`)
VALUES (1, 'A9017301', 'ACCORINVEST SPAIN SA', 'SE'),
			 (2, 'A9041701', 'MONTREUILLOISE', 'SE'),
			 (3, 'A9037801', 'SCHE', 'SE'),
			 (4, 'A9038901', 'SIM', 'SE'),
			 (5, 'A9027801', 'HOTEXCO', 'NE'),
			 (6, 'A9016601', 'PORTIS HOTEIS PORTUGUESES', 'NE');


INSERT INTO `user`(`id`, `first_name`, `last_name`, `password`, `username`, `primary_branch`)
VALUES (1, 'Belen', 'TOLOSA', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H3132-GM@gmail.com', 'A9015701'),
			 (2, 'Laurent', 'Magdelon', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H3086-GM@gmail.com', 'A9015701'),
			 (3, 'Benjamin', 'Chacun', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+benjamin.chacun@accor.com', 'A9015701'),
			 (4, 'Arnaud', 'Stephane', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H1249-GM@gmail.com', 'A9015701'),
			 (5, 'Xavier', 'ALARCON', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H752-GM@gmail.com', 'A9015701'),
			 (6, 'Sergio', 'BASTOS', '$2a$10$OxVr0.tZrJFiDrE6.cGfZuSF7CqOwcNe6acvLYyr7.DT2HzvevVbu',
				'ps.accor+H3347-GM@gmail.com', 'A9015701');



INSERT INTO `company_parameter`(`id`, `dispacher_mail`, `mega_code`, `name`, `branch_id`, `usergm_id`)
VALUES (1, 'ps.accor+H3132-GM@gmail.com', '02507.H3132', 'IBIS BARCELONA FIRA DE CORNELLA', 1, 1),
			 (2, 'ps.accor+H3086-BO@gmail.com', '03354.H3086', 'IBIS BUDGET PARIS PORTE DE VINCENNES', 2, 2),
			 (3, 'ps.accor+H2420-RE@accor.com', '02953.H2420', 'HOTELF1 EVRY A6', 3, 3),
			 (4, 'ps.accor+H1249-GM@gmail.com', '05144.H1249', 'MERCURE RENNES CENTRE GARE', 4, 4),
			 (5, 'ps.accor+H752-GM@gmail.com', '02935.H0752', 'IBIS EVRY', 5, 5),
			 (6, 'ps.accor+H3347-GM@gmail.com', '02435.H3347', 'MERCURE PORTO GAIA', 6, 6);


INSERT INTO `role`(`id`, `name`)
VALUES (1, 'ROLE_GM');

INSERT INTO `users_roles`(`user_id`, `role_id`)
VALUES (1, 1),
			 (2, 1),
			 (3, 1),
			 (4, 1),
			 (5, 1),
			 (6, 1);

INSERT INTO `staff`(`mail`, `first_name`, `last_name`, `company_parameter_id`)
VALUES ('ps.accor+H3086-BO@gmail.com', 'Beatrice', 'Soubabere', 2),
			 ('ps.accor+H2420-RE@accor.com', 'Axelle', 'Albisser', 3),
			 ('ps.accor+H1249-DM@gmail.com', 'Hervé', 'Lemiègre', 4),
			 ('ps.accor+H1249-HK@gmail.com', 'Véronique', 'Fréoul', 4),
			 ('ps.accor+H1249-KC@gmail.com', 'Yannick', 'Brémond', 4),
			 ('ps.accor+H1249-RE@gmail.com', 'Philippe', 'Noblet', 4),
			 ('ps.accor+H1249-TE@gmail.com', 'Frédéric', 'Fretay', 4),
			 ('ps.accor+H752-DM@gmail.com', 'Thierry', 'GOMES', 5),
			 ('ps.accor+H752-ACT@gmail.com', 'John', 'Passot', 5),
			 ('ps.accor+H3347-AM@gmail.com', 'Pedro', 'Martingo', 6),
			 ('ps.accor+H3347-SL@gmail.com', 'Rita', 'Silva', 6),
			 ('ps.accor+H3347-FB1@gmail.com', 'Sandra', 'Bento', 6),
			 ('ps.accor+H3347-FB@gmail.com', 'Sandra', 'Lopes', 6),
			 ('ps.accor+H3347-TE@gmail.com', 'Paulo', 'Nunes', 6);
