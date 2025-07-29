-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 29/07/2025 às 11:38
-- Versão do servidor: 8.0.30
-- Versão do PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `bdpw`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `icone` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id`, `tipo`, `icone`, `data_cadastro`, `data_alteracao`) VALUES
(1, 'Sedan', 'icone_sedan.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(2, 'Hatch', 'icone_hatch.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(3, 'Perua', 'icone_perua.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(4, 'SUVs', 'icone_suvs.png', '2023-04-26 16:35:16', '2023-04-26 16:51:52'),
(5, 'Conversível', 'icone_conversivel.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(6, 'Esport', 'logo_esport.png', '2023-05-04 01:28:10', '2023-05-04 01:30:36');

-- --------------------------------------------------------

--
-- Estrutura para tabela `montadora`
--

CREATE TABLE `montadora` (
  `id` int NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `logotipo` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `montadora`
--

INSERT INTO `montadora` (`id`, `nome`, `logotipo`, `data_cadastro`, `data_alteracao`) VALUES
(1, 'Volkswagen', 'logo_volkswagen.png', '2023-04-26 16:35:16', '2023-05-04 01:17:47'),
(2, 'Toyota', 'logo_toyota.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(3, 'Honda', 'logo_honda.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(4, 'Ford', 'logo_ford.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(5, 'Chevrolet', 'logo_chevrolet.png', '2023-04-26 16:35:16', '2023-04-26 16:35:16'),
(6, 'BMW', 'logo_bmw.png', '2023-04-26 16:57:20', '2023-04-26 16:57:20'),
(7, 'Fiat', 'logo_fiat.png', '2023-04-26 17:01:35', '2023-04-26 17:01:35'),
(8, 'Chrysler', 'logo_chrysler.png', '2023-05-04 00:39:20', '2023-05-04 00:39:20');

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculo`
--

CREATE TABLE `veiculo` (
  `id` int NOT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `ano_fabricacao` int DEFAULT NULL,
  `ano_modelo` int DEFAULT NULL,
  `cor` varchar(50) DEFAULT NULL,
  `num_portas` int DEFAULT NULL,
  `fotos` json DEFAULT NULL,
  `categoria_id` int DEFAULT NULL,
  `montadora_id` int DEFAULT NULL,
  `tipo_cambio` varchar(50) DEFAULT NULL,
  `tipo_direcao` varchar(50) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_alteracao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `veiculo`
--

INSERT INTO `veiculo` (`id`, `modelo`, `ano_fabricacao`, `ano_modelo`, `cor`, `num_portas`, `fotos`, `categoria_id`, `montadora_id`, `tipo_cambio`, `tipo_direcao`, `data_cadastro`, `data_alteracao`) VALUES
(1, 'golf variant GTI', 2019, 2020, 'Preto', 4, NULL, 3, 1, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(2, 'Gol', 2021, 2022, 'Prata', 4, NULL, 2, 1, 'Manual', 'Hidráulica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(3, 'Corolla', 2021, 2022, 'Preto', 4, NULL, 1, 2, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(4, 'Yaris', 2021, 2022, 'Prata', 4, NULL, 2, 2, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(5, 'Etios', 2021, 2022, 'Cinza', 4, NULL, 2, 2, 'Manual', 'Hidráulica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(6, 'Civic', 2021, 2022, 'Branco', 4, NULL, 1, 3, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(7, 'City', 2020, 2021, 'Marrom', 4, NULL, 1, 3, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(8, 'Fusion', 2019, 2020, 'Preto', 4, NULL, 1, 4, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(9, 'Focus', 2019, 2020, 'Preto', 4, NULL, 1, 4, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(10, 'Fiesta', 2020, 2021, 'Vermelho', 4, NULL, 2, 4, 'Manual', 'Mecânica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(11, 'Cruze LTZ 1.5 Turbo', 2021, 2021, 'Azul', 4, NULL, 1, 5, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(12, 'Onix', 2021, 2022, 'Vermelho', 4, NULL, 2, 5, 'Manual', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(13, 'Tracker', 2020, 2021, 'Branco', 4, NULL, 4, 5, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(14, 'BMW M4    ', 2020, 2020, 'Prata', 2, NULL, 5, 6, 'Automático', 'Elétrica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(15, 'Uno', 2020, 2021, 'Azul', 2, NULL, 2, 7, 'Manual', 'Mecânica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(16, 'Palio', 2019, 2020, 'Amarelo', 2, NULL, 2, 7, 'Manual', 'Mecânica', '2023-04-26 17:03:00', '2025-07-29 11:36:58'),
(17, 'Passat', 2021, 2022, 'Preto', 4, NULL, 1, 1, 'Automático', 'Elétrica', '2023-08-01 14:01:46', '2025-07-29 11:36:58'),
(22, 'Cruze LTZ', 2021, 2021, 'Azul', 4, NULL, 1, 5, 'Automático', 'Elétrica', '2023-09-07 17:43:12', '2025-07-29 11:36:58'),
(23, 'Passat ffff', 2021, 2022, 'Preto', 4, NULL, 1, 1, 'Automático', 'Elétrica', '2023-09-07 17:45:38', '2025-07-29 11:36:58'),
(24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:46:20', '2023-09-07 17:46:20'),
(25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:50:18', '2023-09-07 17:50:18'),
(26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:51:37', '2023-09-07 17:51:37'),
(27, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:53:37', '2023-09-07 17:53:37'),
(28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:53:56', '2023-09-07 17:53:56'),
(29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 17:57:19', '2023-09-07 17:57:19'),
(30, 'Cruze LTZ', 2021, 2021, 'Azul', 4, NULL, 1, 5, 'Automático', 'Elétrica', '2023-09-07 17:59:07', '2025-07-29 11:36:58'),
(33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-09-07 18:50:58', '2023-09-07 18:50:58'),
(34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2023-11-01 21:37:30', '2023-11-01 21:37:30');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Índices de tabela `montadora`
--
ALTER TABLE `montadora`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `veiculo`
--
ALTER TABLE `veiculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `montadora_id` (`montadora_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `montadora`
--
ALTER TABLE `montadora`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `veiculo`
--
ALTER TABLE `veiculo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `veiculo`
--
ALTER TABLE `veiculo`
  ADD CONSTRAINT `veiculo_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `veiculo_ibfk_2` FOREIGN KEY (`montadora_id`) REFERENCES `montadora` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
