-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 29 oct. 2021 à 13:43
-- Version du serveur : 5.7.33
-- Version de PHP : 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `author` text NOT NULL,
  `content` text NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `answers`
--

INSERT INTO `answers` (`id`, `author`, `content`, `postId`, `userId`, `createdAt`, `updatedAt`) VALUES
(7, 'Patrick', 'Ah génial , moi aussi je regardais souvent !!!', 6, 2, '2021-10-29 15:34:30', '2021-10-29 15:34:30'),
(8, 'Emmanuel', 'Pff , je préférè la martinique', 7, 3, '2021-10-29 15:37:55', '2021-10-29 15:37:55'),
(10, 'Illidan', 'La meilleur trilogie de tout les temps , je suis bien d\'accord', 8, 4, '2021-10-29 15:39:57', '2021-10-29 15:39:57'),
(11, 'Illidan', 'Emmanuel t\'es toujours entrain de raler', 7, 4, '2021-10-29 15:40:08', '2021-10-29 15:40:08'),
(12, 'Illidan', 'C\'est cool et DBZ aussi !!', 6, 4, '2021-10-29 15:40:26', '2021-10-29 15:40:26');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `author`, `content`, `attachement`, `createdAt`, `updatedAt`) VALUES
(6, 1, 'Olive et Tom', 'Admin', 'Olivier Atton rêve de devenir le meilleur footballeur au monde. Il rencontre et affronte tous les meilleurs joueurs du pays, avec lesquels il se lie d\'amitié, tels que Thomas Price, Ben Becker ou encore Bruce Harper.', 'http://localhost:3000/images/71683471579608775.jpg1635424231434.jpg1635513948410.jpg', '2021-10-29 15:25:48', '2021-10-29 15:25:48'),
(7, 2, 'La Guadeloupe', 'Patrick', 'Territoire français d\'outre-mer, la Guadeloupe est un groupe d\'îles situé dans le sud de la mer des Caraïbes. Ressemblant à un papillon, ses deux plus grandes îles sont séparées par la Rivière Salée. L\'île vallonnée de Grande-Terre possède de longues plages et des champs de canne à sucre. Sur l\'île de Basse-Terre, le parc national de la Guadeloupe abrite les chutes du Carbet et le volcan de la Grande Soufrière. Parmi les îles de plus petite taille figurent Marie-Galante et la Désirade.', 'http://localhost:3000/images/Guadeloupe.jpg1635423114877.jpg1635511936403.jpg1635514445300.jpg', '2021-10-29 15:34:05', '2021-10-29 15:34:05'),
(8, 3, 'Le Seigneur des Anneaux', 'Emmanuel', '\r\nLe Seigneur des anneaux est une trilogie cinématographique de fantasy américano-néo-zélandaise réalisée par Peter Jackson et fondée sur le roman du même nom en trois volumes de J. R. R. Tolkien. Les films composant cette trilogie sont La Communauté de l\'anneau, Les Deux Tours et Le Retour du roi.', 'http://localhost:3000/images/1608701.jpg1635514656281.jpg', '2021-10-29 15:37:36', '2021-10-29 15:37:36'),
(9, 4, 'The Burning Crusade', 'Illidan', 'Vous n’êtes pas prêt !', 'http://localhost:3000/images/1185009-illidan-legion-amp_main_media_schema-2.jpg1635424037152.jpg1635514776737.jpg', '2021-10-29 15:39:36', '2021-10-29 15:39:36'),
(10, 1, 'L\'A350', 'Admin', 'L\'Airbus A350 XWB est un avion de ligne long-courrier et gros porteur du constructeur européen Airbus. Initialement baptisé A350, ce modèle était dérivé de l\'A330 ; toutefois, à la suite des remarques des compagnies aériennes, il a été décidé à la mi-juillet 2006 d\'en revoir le concept et de le munir d\'un fuselage plus large, à la fois par rapport aux A330 et A340, et surtout par rapport à son principal concurrent, à cette époque, le Boeing 7873. Cette évolution permet aujourd\'hui à l\'A350 de concurrencer aussi le nouveau Boeing 777X (dont le premier vol, initialement prévu le 13 mars 2019, a finalement eu lieu le 25 janvier 2020).\r\n\r\nLe projet a été ainsi rebaptisé « A350 XWB », pour eXtra Wide Body – « fuselage extra-large », en anglais. Cette modification tardive, ainsi qu\'une conception faisant davantage appel aux matériaux composites, ont fortement augmenté les coûts de conception de l\'avion et ont reporté de 2011 à 2014 son entrée en service', 'http://localhost:3000/images/19419012lpw-19419105-article-jpg_6535007_1250x625.jpg1635424719380.jpg1635514923686.jpg', '2021-10-29 15:42:03', '2021-10-29 15:42:03');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200528161145-create-user.js'),
('20200528161602-create-post.js'),
('20211022155635-create-answers.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@admin.fr', 'Admin', '$2b$10$3FHcgnERmPqz7RQEW9qxU.VtjXWcoZv2QJI.NGOYuExeaQC83/6cy', 1, '2021-10-29 14:50:39', '2021-10-29 14:50:39'),
(2, 'patrick.juvet@test.fr', 'Patrick', '$2b$10$sXo79ltJ2tVBF9rJE3tszeAPRPnpuKW2JTEyCJZDby9Zerwk/B69O', 0, '2021-10-29 15:33:43', '2021-10-29 15:33:43'),
(3, 'micron@test.fr', 'Emmanuel', '$2b$10$T6Qc1in71.JSwG9ChCaoH.QaDE/uZ2xZfm/6X1tXiSFQrFtq4V3QC', 0, '2021-10-29 15:36:43', '2021-10-29 15:36:43'),
(4, 'illidan@test.fr', 'Illidan', '$2b$10$UpdoOUNQg489JQn6D7YMreDOdwCXc6n6OCsncEb1sIoQYKDwRYJ2u', 0, '2021-10-29 15:39:09', '2021-10-29 15:39:09');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `postId` (`postId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
