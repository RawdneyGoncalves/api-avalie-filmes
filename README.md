# API Avalie Filmes

## Descrição

API para avaliações de filmes com integração ao OMDB, construída com Fastify, TypeORM e InversifyJS. Arquitetura em camadas e testes com Jest e Supertest garantem qualidade e flexibilidade.

## Tecnologias Utilizadas

- **Framework:** Fastify
- **ORM:** TypeORM
- **Injeção de Dependências:** InversifyJS
- **Banco de Dados:** MySQL
- **Validação:** class-validator e class-transformer
- **Testes:** Jest e Supertest
- **Documentação:** Fastify Swagger
- **Containerização:** Docker e Docker Compose

## Estrutura do Projeto

```
api-avalie-filmes/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── inversify/
│   ├── repositories/
│   ├── entities/
│   └── app.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

## Iniciando o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose

### Passos para Iniciar

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/RawdneyGoncalves/api-avalie-filmes.git
   cd api-avalie-filmes
   ```

2. **Configuração de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

   ```
   DB_HOST=db
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=password
   DB_NAME=dolado
   OMDB_API_KEY=sua_chave_api_omdb
   ```

   Substitua `sua_chave_api_omdb` pela sua chave real da API OMDB.

3. **Iniciar com Docker**

   Para iniciar a aplicação e o banco de dados usando Docker, execute:

   ```bash
   docker-compose up --build
   ```

   Isso irá construir a imagem da aplicação, iniciar os containers, executar as migrações e iniciar a API.

4. **Acesso à API**

   A API estará disponível em `http://localhost:3000`

5. **Documentação da API**

   Acesse a documentação Swagger em `http://localhost:3000/docs`

### Desenvolvimento Local (Sem Docker)

Se preferir rodar a aplicação localmente sem Docker:

1. **Instale as Dependências**

   ```bash
   npm install
   ```

2. **Configure o Banco de Dados**

   Certifique-se de ter um servidor MySQL rodando e atualize as configurações no arquivo `.env`.

3. **Execute as Migrações**

   ```bash
   npm run migration:run
   ```

4. **Inicie a Aplicação**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em `http://localhost:3000`

## Testes

Para executar os testes:

```bash
npm test
```

## Contribuindo

Contribuições são bem-vindas! Por favor, leia o arquivo CONTRIBUTING.md para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.
