-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 28 jan. 2023 à 12:56
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP : 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bddaccorappuser`
--

-- --------------------------------------------------------

--
-- Structure de la table `approval`
--

CREATE TABLE `approval` (
													`id` bigint(20) NOT NULL,
													`approval_limitgm` varchar(255) DEFAULT NULL,
													`approval_limitn1` varchar(255) DEFAULT NULL,
													`approval_limitn2` varchar(255) DEFAULT NULL,
													`categoryid_id` bigint(20) DEFAULT NULL,
													`companyid_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `branch`
--

CREATE TABLE `branch` (
												`id` bigint(20) NOT NULL,
												`code` varchar(255) NOT NULL,
												`name` varchar(255) DEFAULT NULL,
												`perimeter` varchar(255) DEFAULT NULL,
												`usermgm_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
													`id` bigint(20) NOT NULL,
													`code` varchar(255) DEFAULT NULL,
													`name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Structure de la table `company_parameter`
--

CREATE TABLE `company_parameter` (
																	 `id` bigint(20) NOT NULL,
																	 `dispacher_mail` varchar(255) DEFAULT NULL,
																	 `general_managern1mail` varchar(255) NOT NULL,
																	 `mega_code` varchar(255) DEFAULT NULL,
																	 `name` varchar(255) DEFAULT NULL,
																	 `branch_id` bigint(20) DEFAULT NULL,
																	 `category_id` bigint(20) DEFAULT NULL,
																	 `usergm_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `cost_center`
--

CREATE TABLE `cost_center` (
														 `id` bigint(20) NOT NULL,
														 `code` varchar(255) DEFAULT NULL,
														 `label` varchar(255) DEFAULT NULL,
														 `owner` varchar(255) DEFAULT NULL,
														 `company_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
	`next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
											`id` bigint(20) NOT NULL,
											`name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `staff`
--

CREATE TABLE `staff` (
											 `id` bigint(20) NOT NULL,
											 `first_name` varchar(255) DEFAULT NULL,
											 `last_name` varchar(255) DEFAULT NULL,
											 `mail` varchar(255) NOT NULL,
											 `company_parameter_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
											`id` bigint(20) NOT NULL,
											`approval_limit` varchar(255) DEFAULT NULL,
											`first_name` varchar(255) DEFAULT NULL,
											`last_name` varchar(255) DEFAULT NULL,
											`password` varchar(255) DEFAULT NULL,
											`primary_branch` varchar(255) DEFAULT NULL,
											`reset_date` datetime DEFAULT NULL,
											`reset_key` varchar(255) DEFAULT NULL,
											`spend_limit` varchar(255) DEFAULT NULL,
											`username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users_roles`
--

CREATE TABLE `users_roles` (
														 `user_id` bigint(20) NOT NULL,
														 `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `approval`
--
ALTER TABLE `approval`
	ADD PRIMARY KEY (`id`),
  ADD KEY `FKlobnvm7tjen6rk5dxd3xkmu7c` (`categoryid_id`),
  ADD KEY `FKlt55rmkqjhv986agvf5mn09w9` (`companyid_id`);

--
-- Index pour la table `branch`
--
ALTER TABLE `branch`
	ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_f0gwphsg8g5i4rfbyeo6vvf11` (`code`),
  ADD KEY `FKkr2ww2dwl6r7gy3a8ij9ffkox` (`usermgm_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
	ADD PRIMARY KEY (`id`);

--
-- Index pour la table `company_parameter`
--
ALTER TABLE `company_parameter`
	ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_5bms60qbnfjiajh2ajq83j6up` (`mega_code`),
  ADD KEY `FKpgh9j23ubag8xa5vpgf5uevbu` (`branch_id`),
  ADD KEY `FK7ophn1nvgyi66tw2lcgb2ol38` (`category_id`),
  ADD KEY `FKjap2foqwlgj6kv8bpo11oe54r` (`usergm_id`);

--
-- Index pour la table `cost_center`
--
ALTER TABLE `cost_center`
	ADD PRIMARY KEY (`id`),
  ADD KEY `FKfa5qydlbsheuyxkbqrghpyl75` (`company_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
	ADD PRIMARY KEY (`id`);

--
-- Index pour la table `staff`
--
ALTER TABLE `staff`
	ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_fssvstrr1ayb3m25r7qex50ba` (`mail`),
  ADD KEY `FK8cji5ysr4wnxmhjqoe8032o9a` (`company_parameter_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
	ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`);

--
-- Index pour la table `users_roles`
--
ALTER TABLE `users_roles`
	ADD KEY `FKt4v0rrweyk393bdgt107vdx0x` (`role_id`),
  ADD KEY `FKgd3iendaoyh04b95ykqise6qh` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `approval`
--
ALTER TABLE `approval`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `branch`
--
ALTER TABLE `branch`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `company_parameter`
--
ALTER TABLE `company_parameter`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `cost_center`
--
ALTER TABLE `cost_center`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `staff`
--
ALTER TABLE `staff`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
	MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `approval`
--
ALTER TABLE `approval`
	ADD CONSTRAINT `FKlobnvm7tjen6rk5dxd3xkmu7c` FOREIGN KEY (`categoryid_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKlt55rmkqjhv986agvf5mn09w9` FOREIGN KEY (`companyid_id`) REFERENCES `company_parameter` (`id`);

--
-- Contraintes pour la table `branch`
--
ALTER TABLE `branch`
	ADD CONSTRAINT `FKkr2ww2dwl6r7gy3a8ij9ffkox` FOREIGN KEY (`usermgm_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `company_parameter`
--
ALTER TABLE `company_parameter`
	ADD CONSTRAINT `FK7ophn1nvgyi66tw2lcgb2ol38` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKjap2foqwlgj6kv8bpo11oe54r` FOREIGN KEY (`usergm_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKpgh9j23ubag8xa5vpgf5uevbu` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`);

--
-- Contraintes pour la table `cost_center`
--
ALTER TABLE `cost_center`
	ADD CONSTRAINT `FKfa5qydlbsheuyxkbqrghpyl75` FOREIGN KEY (`company_id`) REFERENCES `company_parameter` (`id`);

--
-- Contraintes pour la table `staff`
--
ALTER TABLE `staff`
	ADD CONSTRAINT `FK8cji5ysr4wnxmhjqoe8032o9a` FOREIGN KEY (`company_parameter_id`) REFERENCES `company_parameter` (`id`);

--
-- Contraintes pour la table `users_roles`
--
ALTER TABLE `users_roles`
	ADD CONSTRAINT `FKgd3iendaoyh04b95ykqise6qh` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKt4v0rrweyk393bdgt107vdx0x` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
