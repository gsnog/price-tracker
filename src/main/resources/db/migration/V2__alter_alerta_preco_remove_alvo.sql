-- Remove a coluna antiga que não queremos mais
ALTER TABLE alerta_preco DROP COLUMN preco_alvo;

-- Adiciona a nova coluna para guardar a memória do último preço lido
ALTER TABLE alerta_preco ADD COLUMN ultimo_preco DECIMAL(10,2);