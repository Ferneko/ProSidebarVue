-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 15-Out-2020 às 15:27
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `base`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_usuario`
--

CREATE TABLE `grupo_usuario` (
  `id` bigint(20) NOT NULL,
  `nome` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `grupo_usuario`
--

INSERT INTO `grupo_usuario` (`id`, `nome`) VALUES
(15, 'Administrador'),
(16, 'Colaboradores');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_usuario_permissao`
--

CREATE TABLE `grupo_usuario_permissao` (
  `id` bigint(20) NOT NULL,
  `grupoUsuarioId` bigint(20) NOT NULL,
  `permissaoId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `grupo_usuario_permissao`
--

INSERT INTO `grupo_usuario_permissao` (`grupoUsuarioId`, `permissaoId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29);

-- --------------------------------------------------------

--
-- Estrutura da tabela `permissao`
--

CREATE TABLE `permissao` (
  `id` bigint(20) NOT NULL,
  `nome` text DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `role` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `permissao`
--

INSERT INTO `permissao` (`nome`, `descricao`, `role`) VALUES
('AcessarPermissao', 'AcessarPermissao', 'AcessarPermissao'),
('cadastrarPermissao', 'cadastrarPermissao', 'CadastrarPermissao'),
('excluirPermissao', 'excluirPermissao', 'excluirPermissao'),
('AcessarGrupoUsuario', 'AcessarGrupoUsuario', 'AcessarGrupoUsuario'),
('EditarGrupoUsuario', 'EditarGrupoUsuario', 'EditarGrupoUsuario'),
('CadastrarGrupoUsuario', 'CadastrarGrupoUsuario', 'CadastrarGrupoUsuario'),
('EditarPermissao', 'EditarPermissao', 'EditarPermissao'),
('AtribuirPermissaoUsuario', 'AtribuirPermissaoUsuario', 'AtribuirPermissaoUsuario'),
('AtribuirPermissaoGrupoUsuario', 'AtribuirPermissaoGrupoUsuario', 'AtribuirPermissaoGrupoUsuario'),
('AcessarProjetos', 'AcessarProjetos', 'AcessarProjetos'),
('EditarProjeto', 'EditarProjeto', 'EditarProjeto'),
('CadastrarProjeto', 'CadastrarProjeto', 'CadastrarProjeto'),
('EditarRegistro', 'EditarRegistro', 'EditarRegistro'),
('AcessarRelatorios', 'AcessarRelatorios', 'AcessarRelatorios'),
('AcessarTarefas', 'AcessarTarefas', 'AcessarTarefas'),
('EditarTarefa', 'EditarTarefa', 'EditarTarefa'),
('CadastrarTarefa', 'CadastrarTarefa', 'CadastrarTarefa'),
('ListarTarefasProjeto', 'ListarTarefasProjeto', 'ListarTarefasProjeto'),
('AtribuirUsuarioGrupoUsuario', 'AtribuirUsuarioGrupoUsuario', 'AtribuirUsuarioGrupoUsuario'),
('AcessarUsuarios', 'AcessarUsuarios', 'AcessarUsuarios'),
('AlterarSenhaUsuario', 'AlterarSenhaUsuario', 'AlterarSenhaUsuario'),
('EditarUsuario', 'EditarUsuario', 'EditarUsuario'),
('CadastrarUsuario', 'CadastrarUsuario', 'CadastrarUsuario'),
('excluirGrupoUsuario', 'excluirGrupoUsuario', 'excluirGrupoUsuario'),
('excluirProjeto', 'excluirProjeto', 'excluirProjeto'),
('excluirRegistros', 'excluirRegistros', 'excluirRegistros'),
('ManutencaoTarefa', 'ManutencaoTarefa', 'ManutencaoTarefa'),
('excluirTarefa', 'excluirTarefa', 'excluirTarefa'),
('ExcluirUsuario', 'ExcluirUsuario', 'ExcluirUsuario');
- --------------------------------------------------------

--
-- Estrutura da tabela `projetos`
--

CREATE TABLE `projetos` (
  `id` bigint(20) NOT NULL,
  `nome` text DEFAULT NULL,
  `inicio` datetime NOT NULL DEFAULT '0001-01-01 00:00:00',
  `termino` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `projetos`
--

INSERT INTO `projetos` (`id`, `nome`, `inicio`, `termino`) VALUES
(1, 'Sistema', '2020-10-08 00:00:00', NULL),
(3, 'Jogo', '2020-10-08 00:00:00', NULL),
(5, 'Website', '2020-09-08 00:00:00', NULL),
(10, 'Sistema de compras', '2020-10-15 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `registros`
--

CREATE TABLE `registros` (
  `id` bigint(20) NOT NULL,
  `tarefaId` bigint(20) NOT NULL,
  `play` datetime NOT NULL,
  `stop` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `registros`
--

INSERT INTO `registros` (`id`, `tarefaId`, `play`, `stop`) VALUES
(2, 6, '0001-01-01 00:00:00', '2020-10-12 11:46:07'),
(4, 6, '0001-01-01 00:00:00', '2020-10-12 11:47:32'),
(5, 6, '0001-01-01 00:00:00', '2020-10-12 12:58:42'),
(6, 6, '2020-10-12 13:03:41', '2020-10-12 13:05:45'),
(12, 10, '2020-10-12 15:30:33', NULL),
(13, 9, '2020-10-12 15:31:10', NULL),
(14, 6, '2020-10-13 07:50:04', '2020-10-13 07:50:08'),
(15, 6, '2020-10-13 07:50:09', '2020-10-13 07:50:11'),
(20, 6, '2020-10-13 08:03:38', '2020-10-13 08:10:53'),
(22, 6, '2020-10-13 15:45:59', '2020-10-13 15:46:31'),
(23, 8, '2020-10-13 16:15:15', '2020-10-13 16:20:15');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `id` bigint(20) NOT NULL,
  `nome` text DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `duracaoHoras` int(11) NOT NULL,
  `usuarioId` bigint(20) NOT NULL,
  `projetoId` bigint(20) NOT NULL,
  `concluida` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`id`, `nome`, `descricao`, `duracaoHoras`, `usuarioId`, `projetoId`, `concluida`) VALUES
(4, 'Programação', 'programar a tela de entrada de estoque', 12, 3, 10, b'0'),
(5, 'Programação', 'Criar a logo para o cabecalho', 2, 5, 5, b'0'),
(6, 'Programação', 'Programar o personagem', 10, 2, 3, b'0'),
(7, 'Desenhar personagem', 'desenhar bob esponja com humbuerguer de siri', 50, 3, 3, b'0'),
(8, 'Desenhar bob esponja', 'desenhar bob esponja com humbuerguer de siri e com sua espatula', 30, 6, 3, b'0'),
(9, 'layout', 'desenvolver o layout do site', 15, 5, 1, b'0'),
(10, 'back end', 'criar o back end do projeto', 20, 4, 5, b'0'),
(11, 'Dev', 'Criar o calendario', 15, 2, 1, b'0'),
(12, 'Música, Maestro!', 'ahuahauh', 10, 6, 3, b'0');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(20) NOT NULL,
  `nome` text DEFAULT NULL,
  `login` text DEFAULT NULL,
  `senha` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `ativo` bit(1) NOT NULL,
  `trocarSenha` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `login`, `senha`, `email`, `ativo`, `trocarSenha`) VALUES
(2, 'Fernando', 'fernando', '034c88d86eb420d8953fc712ddf44d0a6eabceecad38d9e0e986e017bcf5f663daed4246b41b807e175afabff993c8f0d8a5b2446c9b467fab2c1918fa854444', 'fernando@fernando.com', b'1', b'0'),
(3, 'Joao', 'joao.silva', 'e9472bbaa705371a9394d7b8d64c01fc4ee7036df4b8c1dcd584c235857f5d51948c8ad420c1c14248e03cadd09cafc155c8f71b23ee47232e0d880a77e0d37e', 'joao@joao.com.br', b'1', b'1'),
(4, 'Maria', 'maria', '034c88d86eb420d8953fc712ddf44d0a6eabceecad38d9e0e986e017bcf5f663daed4246b41b807e175afabff993c8f0d8a5b2446c9b467fab2c1918fa854444', 'maria@maria.com', b'1', b'1'),
(5, 'Eduarda', 'eduarda', '034c88d86eb420d8953fc712ddf44d0a6eabceecad38d9e0e986e017bcf5f663daed4246b41b807e175afabff993c8f0d8a5b2446c9b467fab2c1918fa854444', 'eduarda@eduarda.com', b'1', b'1'),
(6, 'Luan', 'luan', 'e9472bbaa705371a9394d7b8d64c01fc4ee7036df4b8c1dcd584c235857f5d51948c8ad420c1c14248e03cadd09cafc155c8f71b23ee47232e0d880a77e0d37e', 'luan@luan.com.br', b'1', b'1');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_grupo_usuario`
--

CREATE TABLE `usuario_grupo_usuario` (
  `id` bigint(20) NOT NULL,
  `usuarioId` bigint(20) NOT NULL,
  `grupoUsuarioId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario_grupo_usuario`
--

INSERT INTO `usuario_grupo_usuario` (`id`, `usuarioId`, `grupoUsuarioId`) VALUES
(7, 3, 16),
(8, 4, 15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_permissao`
--

CREATE TABLE `usuario_permissao` (
  `id` bigint(20) NOT NULL,
  `usuarioId` bigint(20) NOT NULL,
  `permissaoId` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario_permissao`
--

INSERT INTO `usuario_permissao` (`id`, `usuarioId`, `permissaoId`) VALUES
(53, 4, 5),
(54, 4, 6),
(55, 4, 7),
(56, 4, 8),
(57, 4, 9),
(58, 4, 10),
(59, 4, 11),
(60, 4, 12),
(61, 4, 13),
(62, 4, 14),
(63, 4, 15),
(64, 4, 16),
(65, 4, 17),
(66, 4, 18),
(67, 4, 19),
(68, 4, 20),
(69, 4, 21),
(70, 4, 22),
(71, 4, 23),
(72, 4, 24),
(73, 4, 25),
(74, 4, 26),
(75, 4, 27),
(76, 4, 28),
(77, 4, 31),
(78, 4, 32),
(79, 4, 33),
(80, 4, 34),
(81, 4, 36);

-- --------------------------------------------------------

--
-- Estrutura da tabela `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20200810045413_UsuarioPermissaoGrupos', '3.1.6'),
('20201008124540_Projetos', '3.1.6'),
('20201008125946_ProjetoDatas', '3.1.6'),
('20201008193912_Tarefas', '3.1.6'),
('20201012130737_registros', '3.1.6'),
('20201012131543_TarefaConcluida', '3.1.6');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `grupo_usuario`
--
ALTER TABLE `grupo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `grupo_usuario_permissao`
--
ALTER TABLE `grupo_usuario_permissao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_GRUPO_USUARIO_PERMISSAO_grupoUsuarioId` (`grupoUsuarioId`),
  ADD KEY `IX_GRUPO_USUARIO_PERMISSAO_permissaoId` (`permissaoId`);

--
-- Índices para tabela `permissao`
--
ALTER TABLE `permissao`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_REGISTROS_tarefaId` (`tarefaId`);

--
-- Índices para tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_TAREFAS_projetoId` (`projetoId`),
  ADD KEY `IX_TAREFAS_usuarioId` (`usuarioId`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario_grupo_usuario`
--
ALTER TABLE `usuario_grupo_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_USUARIO_GRUPO_USUARIO_grupoUsuarioId` (`grupoUsuarioId`),
  ADD KEY `IX_USUARIO_GRUPO_USUARIO_usuarioId` (`usuarioId`);

--
-- Índices para tabela `usuario_permissao`
--
ALTER TABLE `usuario_permissao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IX_USUARIO_PERMISSAO_permissaoId` (`permissaoId`),
  ADD KEY `IX_USUARIO_PERMISSAO_usuarioId` (`usuarioId`);

--
-- Índices para tabela `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `grupo_usuario`
--
ALTER TABLE `grupo_usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `grupo_usuario_permissao`
--
ALTER TABLE `grupo_usuario_permissao`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `permissao`
--
ALTER TABLE `permissao`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `projetos`
--
ALTER TABLE `projetos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `registros`
--
ALTER TABLE `registros`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `usuario_grupo_usuario`
--
ALTER TABLE `usuario_grupo_usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `usuario_permissao`
--
ALTER TABLE `usuario_permissao`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `grupo_usuario_permissao`
--
ALTER TABLE `grupo_usuario_permissao`
  ADD CONSTRAINT `FK_GRUPO_USUARIO_PERMISSAO_GRUPO_USUARIO_grupoUsuarioId` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupo_usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_GRUPO_USUARIO_PERMISSAO_PERMISSAO_permissaoId` FOREIGN KEY (`permissaoId`) REFERENCES `permissao` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `registros`
--
ALTER TABLE `registros`
  ADD CONSTRAINT `FK_REGISTROS_TAREFAS_tarefaId` FOREIGN KEY (`tarefaId`) REFERENCES `tarefas` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD CONSTRAINT `FK_TAREFAS_PROJETOS_projetoId` FOREIGN KEY (`projetoId`) REFERENCES `projetos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_TAREFAS_USUARIOS_usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `usuario_grupo_usuario`
--
ALTER TABLE `usuario_grupo_usuario`
  ADD CONSTRAINT `FK_USUARIO_GRUPO_USUARIO_GRUPO_USUARIO_grupoUsuarioId` FOREIGN KEY (`grupoUsuarioId`) REFERENCES `grupo_usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USUARIO_GRUPO_USUARIO_USUARIOS_usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `usuario_permissao`
--
ALTER TABLE `usuario_permissao`
  ADD CONSTRAINT `FK_USUARIO_PERMISSAO_PERMISSAO_permissaoId` FOREIGN KEY (`permissaoId`) REFERENCES `permissao` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_USUARIO_PERMISSAO_USUARIOS_usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
