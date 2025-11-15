-- Adicionar coluna modelo à tabela roupas
ALTER TABLE roupas
ADD COLUMN modelo varchar(255) NULL DEFAULT NULL AFTER marca;