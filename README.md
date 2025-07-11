# 🚗 Sistema de Gestão de Frota

Sistema completo de gestão de frota desenvolvido para a avaliação A3 das disciplinas "Sistemas distribuídos e mobile" e "Usabilidade, desenvolvimento web, mobile e jogos".

## 📋 Funcionalidades

### Funcionalidades Base (Obrigatórias)
- ✅ **Autenticação de Gestores**: Login e registro de gestores
- ✅ **CRUD de Motoristas**: Criar, editar, visualizar, listar e deletar motoristas
- ✅ **CRUD de Carros**: Criar, editar, visualizar, listar e deletar carros
- ✅ **CRUD de Eventos**: Criar, editar, visualizar, listar e deletar eventos
- ✅ **Gestão de Empréstimos**: Sistema de empréstimo e devolução de carros
- ✅ **Controle de Status**: Acompanhamento de carros disponíveis e em uso
- ✅ **Relatórios**: Relatórios de uso de veículos e por motorista
- ✅ **Dashboard**: Visão geral do sistema com estatísticas

### Funcionalidades Extras
- 🔐 **Autenticação JWT**: Sistema seguro de autenticação
- 📊 **Dashboard Interativo**: Estatísticas em tempo real
- 🎨 **Interface Moderna**: Design responsivo e intuitivo
- 📱 **Responsivo**: Funciona em dispositivos móveis
- 🔍 **Filtros Avançados**: Busca e filtros por período
- 📈 **Relatórios Detalhados**: Análise de uso de veículos

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** com Express
- **MySQL** como banco de dados
- **JWT** para autenticação
- **bcryptjs** para criptografia de senhas

### Frontend
- **React.js** com hooks
- **React Router** para navegação
- **Bootstrap Icons** para ícones
- **CSS3** com animações

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MySQL (versão 8.0 ou superior)
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd A3
```

### 2. Configure o banco de dados
```bash
# Acesse o MySQL e crie o banco de dados
mysql -u root -p
CREATE DATABASE stand;
USE stand;
exit;
```

### 3. Instale as dependências do backend
```bash
cd backend
npm install
```

### 4. Configure o banco de dados
```bash
# Execute o script de inicialização
node init-db.js
```

### 5. Instale as dependências do frontend
```bash
cd ..
npm install
```

## 🚀 Executando o Projeto

### 1. Inicie o servidor backend
```bash
cd backend
npm run dev
```
O servidor estará rodando em `http://localhost:5000`

### 2. Inicie o frontend
```bash
# Em outro terminal
npm run dev
```
O frontend estará rodando em `http://localhost:5173`

## 👤 Credenciais de Acesso

Após executar o script de inicialização, você pode acessar o sistema com:

- **Email**: admin@frota.com
- **Senha**: admin123

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### Gestores
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nome` (VARCHAR(100))
- `email` (VARCHAR(100), UNIQUE)
- `senha` (VARCHAR(255))
- `telefone` (VARCHAR(20))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Motoristas
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `nome` (VARCHAR(100))
- `cpf` (VARCHAR(14), UNIQUE)
- `telefone` (VARCHAR(20))
- `email` (VARCHAR(100))
- `cnh` (VARCHAR(20))
- `categoria_cnh` (VARCHAR(5))
- `status` (ENUM('ativo', 'inativo'))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Carros
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `placa` (VARCHAR(10), UNIQUE)
- `marca` (VARCHAR(50))
- `modelo` (VARCHAR(50))
- `ano` (INT)
- `cor` (VARCHAR(30))
- `combustivel` (VARCHAR(20))
- `odometro_atual` (DECIMAL(10,2))
- `status` (ENUM('disponivel', 'em_uso', 'manutencao'))
- `motorista_atual` (INT, FOREIGN KEY)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Eventos
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `gestor_id` (INT, FOREIGN KEY)
- `motorista_id` (INT, FOREIGN KEY)
- `carro_id` (INT, FOREIGN KEY)
- `tipo_evento` (ENUM('saida', 'entrada'))
- `odometro` (DECIMAL(10,2))
- `observacoes` (TEXT)
- `data_hora` (TIMESTAMP)

## 🔧 API Endpoints

### Autenticação
- `POST /api/gestores/registrar` - Registrar novo gestor
- `POST /api/gestores/login` - Login de gestor

### Gestores
- `GET /api/gestores` - Listar gestores
- `GET /api/gestores/:id` - Buscar gestor por ID
- `PUT /api/gestores/:id` - Atualizar gestor
- `DELETE /api/gestores/:id` - Deletar gestor

### Motoristas
- `POST /api/motoristas` - Criar motorista
- `GET /api/motoristas` - Listar motoristas
- `GET /api/motoristas/ativos` - Listar motoristas ativos
- `GET /api/motoristas/:id` - Buscar motorista por ID
- `PUT /api/motoristas/:id` - Atualizar motorista
- `DELETE /api/motoristas/:id` - Deletar motorista
- `PATCH /api/motoristas/:id/status` - Alterar status do motorista

### Carros
- `POST /api/cars` - Criar carro
- `GET /api/cars` - Listar carros
- `GET /api/cars/disponiveis` - Listar carros disponíveis
- `GET /api/cars/em-uso` - Listar carros em uso
- `GET /api/cars/:id` - Buscar carro por ID
- `PUT /api/cars/:id` - Atualizar carro
- `DELETE /api/cars/:id` - Deletar carro
- `PATCH /api/cars/:id/status` - Alterar status do carro
- `PATCH /api/cars/:id/odometro` - Atualizar odômetro

### Eventos
- `POST /api/eventos` - Criar evento
- `GET /api/eventos` - Listar eventos
- `GET /api/eventos/:id` - Buscar evento por ID
- `PUT /api/eventos/:id` - Atualizar evento
- `DELETE /api/eventos/:id` - Deletar evento
- `POST /api/eventos/emprestar` - Emprestar carro
- `POST /api/eventos/devolver` - Devolver carro
- `GET /api/eventos/periodo` - Listar eventos por período
- `GET /api/eventos/motorista/:motoristaId` - Listar eventos por motorista
- `GET /api/eventos/carro/:carroId` - Listar eventos por carro
- `GET /api/eventos/relatorio/uso` - Relatório de uso

## 📱 Como Usar

### 1. Login
- Acesse `http://localhost:5173`
- Use as credenciais padrão ou registre um novo gestor

### 2. Dashboard
- Visualize estatísticas gerais do sistema
- Acesse ações rápidas

### 3. Gestão de Motoristas
- Cadastre novos motoristas
- Edite informações existentes
- Ative/desative motoristas

### 4. Gestão de Carros
- Cadastre novos carros
- Acompanhe status (disponível/em uso)
- Atualize odômetro

### 5. Eventos
- Empreste carros para motoristas
- Registre devoluções
- Acompanhe histórico de uso

### 6. Relatórios
- Gere relatórios por período
- Analise uso por motorista
- Visualize estatísticas de quilometragem

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de dados
- Proteção contra SQL injection
- CORS configurado

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais na avaliação A3.

## 👥 Equipe

Desenvolvido por [Nome da Equipe] para as disciplinas:
- Sistemas distribuídos e mobile
- Usabilidade, desenvolvimento web, mobile e jogos

---

**⚠️ Nota**: Certifique-se de que o MySQL está rodando antes de executar o projeto.
