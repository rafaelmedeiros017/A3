-- Adicionar colunas necessárias à tabela roupas
ALTER TABLE roupas
ADD COLUMN tamanho varchar(50) NULL DEFAULT NULL AFTER marca;

ALTER TABLE roupas
ADD COLUMN material varchar(100) NULL DEFAULT NULL AFTER tipo;

ALTER TABLE roupas
ADD COLUMN estoque int(11) NULL DEFAULT 0 AFTER preco;

ALTER TABLE roupas
ADD COLUMN descricao text NULL DEFAULT NULL AFTER imagens;