CREATE TABLE usuario (
                         id BIGSERIAL PRIMARY KEY,
                         nome VARCHAR(255) NOT NULL,
                         email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE alerta_preco (
                              id BIGSERIAL PRIMARY KEY,
                              url_produto TEXT NOT NULL,
                              preco_alvo DECIMAL(10,2) NOT NULL,
                              status VARCHAR(50) DEFAULT 'ATIVO' NOT NULL,
                              usuario_id BIGINT NOT NULL,
                              CONSTRAINT fk_alerta_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);