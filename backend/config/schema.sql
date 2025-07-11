-- Schema para Sistema de Gestão de Frota
-- Tabelas: Gestores, Motoristas, Carros, Eventos

-- Tabela de Gestores
CREATE TABLE IF NOT EXISTS gestores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Motoristas
CREATE TABLE IF NOT EXISTS motoristas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    cnh VARCHAR(20) NOT NULL,
    categoria_cnh VARCHAR(5) NOT NULL,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Carros
CREATE TABLE IF NOT EXISTS carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(30) NOT NULL,
    combustivel VARCHAR(20) NOT NULL,
    odometro_atual DECIMAL(10,2) DEFAULT 0,
    status ENUM('disponivel', 'em_uso', 'manutencao') DEFAULT 'disponivel',
    motorista_atual INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (motorista_atual) REFERENCES motoristas(id) ON DELETE SET NULL
);

-- Tabela de Eventos (emprestimos e devolucoes)
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gestor_id INT NOT NULL,
    motorista_id INT NOT NULL,
    carro_id INT NOT NULL,
    tipo_evento ENUM('saida', 'entrada') NOT NULL,
    odometro DECIMAL(10,2) NOT NULL,
    observacoes TEXT,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gestor_id) REFERENCES gestores(id) ON DELETE CASCADE,
    FOREIGN KEY (motorista_id) REFERENCES motoristas(id) ON DELETE CASCADE,
    FOREIGN KEY (carro_id) REFERENCES carros(id) ON DELETE CASCADE
);

-- Inserir gestor padrão para testes (senha: admin123)
INSERT INTO gestores (nome, email, senha, telefone) VALUES 
('Administrador', 'admin@frota.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '11999999999')
ON DUPLICATE KEY UPDATE nome = nome; 