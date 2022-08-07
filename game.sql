-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-08-2022 a las 18:27:19
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220613213241', '2022-06-13 23:32:54', 47),
('DoctrineMigrations\\Version20220621202452', '2022-06-21 22:25:06', 163),
('DoctrineMigrations\\Version20220621203254', '2022-06-21 22:32:58', 33),
('DoctrineMigrations\\Version20220621221521', '2022-06-22 00:15:26', 109),
('DoctrineMigrations\\Version20220707164330', '2022-07-07 18:43:45', 153),
('DoctrineMigrations\\Version20220707165528', '2022-07-07 18:55:34', 111),
('DoctrineMigrations\\Version20220707165643', '2022-07-07 18:56:47', 37),
('DoctrineMigrations\\Version20220713204538', '2022-07-13 22:45:49', 450),
('DoctrineMigrations\\Version20220730115307', '2022-08-01 19:03:24', 146),
('DoctrineMigrations\\Version20220730115644', '2022-08-01 19:03:24', 6),
('DoctrineMigrations\\Version20220801182152', '2022-08-01 20:22:02', 42),
('DoctrineMigrations\\Version20220803154251', '2022-08-03 17:42:58', 160),
('DoctrineMigrations\\Version20220803154431', '2022-08-03 17:44:34', 71),
('DoctrineMigrations\\Version20220803154658', '2022-08-03 17:47:01', 30),
('DoctrineMigrations\\Version20220803173221', '2022-08-03 19:32:24', 34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `friend_request`
--

DROP TABLE IF EXISTS `friend_request`;
CREATE TABLE `friend_request` (
  `id` int(11) NOT NULL,
  `source_user_id` int(11) NOT NULL,
  `target_user_id` int(11) NOT NULL,
  `state` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `friend_request`
--

INSERT INTO `friend_request` (`id`, `source_user_id`, `target_user_id`, `state`) VALUES
(1, 1, 2, 'accepted');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `available_at` datetime NOT NULL,
  `delivered_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aceleration_coefficient` double NOT NULL,
  `turn_coeficient` double NOT NULL,
  `max_speed` double NOT NULL,
  `projectile_id` int(11) DEFAULT NULL,
  `live` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `player`
--

INSERT INTO `player` (`id`, `name`, `img`, `aceleration_coefficient`, `turn_coeficient`, `max_speed`, `projectile_id`, `live`) VALUES
(1, 'Millenary falcon', 'millenary falcon/millenary falcon-stopped.png', 0.05, 3, 10, 1, 100),
(2, 'Endurance', 'ship2/ship2.png', 0, 0, 0, 1, 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projectile`
--

DROP TABLE IF EXISTS `projectile`;
CREATE TABLE `projectile` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `speed` double NOT NULL,
  `damage` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `projectile`
--

INSERT INTO `projectile` (`id`, `name`, `speed`, `damage`) VALUES
(1, 'Projectile 1', 30, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_address` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `ip_address`, `state`) VALUES
(1, 'diegodenavas', '[]', '$2y$13$4fOFrHcnEIY83epghPsz0OYefDcechiSgTjSYtFCL38L3hO4fd1GW', NULL, 'connected'),
(2, 'ividelega', '[]', '$2y$13$4nSxiZMBZvPxl//xFJw15OwvK5cY2CwGmQdaPRmCjme.nTIaNgm4S', NULL, 'connected');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `friend_request`
--
ALTER TABLE `friend_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F284D94EEB16BFD` (`source_user_id`),
  ADD KEY `IDX_F284D946C066AFE` (`target_user_id`);

--
-- Indices de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Indices de la tabla `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_98197A65CE6E9B6C` (`projectile_id`);

--
-- Indices de la tabla `projectile`
--
ALTER TABLE `projectile`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `friend_request`
--
ALTER TABLE `friend_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `projectile`
--
ALTER TABLE `projectile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `friend_request`
--
ALTER TABLE `friend_request`
  ADD CONSTRAINT `FK_F284D946C066AFE` FOREIGN KEY (`target_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_F284D94EEB16BFD` FOREIGN KEY (`source_user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `FK_98197A65CE6E9B6C` FOREIGN KEY (`projectile_id`) REFERENCES `projectile` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
