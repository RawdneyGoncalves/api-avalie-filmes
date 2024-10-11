# API Avalie Filmes

## Descrição

API para avaliações de filmes com integração ao OMDB, construída com Fastify, TypeORM e InversifyJS. Arquitetura em camadas e testes com Jest e Supertest garantem qualidade e flexibilidade.

## Experiência de Desenvolvimento

Durante o desenvolvimento, busquei criar uma API limpa e organizada, utilizando boas práticas de programação e separação de responsabilidades. O uso do TypeORM facilitou a integração com o banco de dados MySQL, enquanto o Fastify garantiu um desempenho eficiente nas requisições. A injeção de dependências com InversifyJS aumentou a modularidade e testabilidade do código.

## Principais Decisões

- **Framework:** Utilizei Fastify pela sua alta performance e facilidade de uso.
- **Injeção de Dependências:** InversifyJS para promover uma arquitetura mais modular e testável.
- **ORM:** TypeORM para facilitar a interação com o banco de dados MySQL.
- **Validação:** `class-validator` e `class-transformer` para garantir a integridade dos dados.
- **Testes:** Jest e Supertest para garantir a qualidade do código com testes unitários e de integração.
- **Documentação:** Fastify Swagger para documentar os endpoints da API.
- **Containerização:** Docker e Docker Compose para facilitar a configuração e execução da aplicação.

## Estrutura do Projeto

api-avalie-filmes/

├── src/ 
│ 
├── config/ 
│ 
├── controllers/ 
│ 
├── middlewares/ 
│ 
├── inversify/ 
│ 
├── repositories/ 
│ 
├── entities/ 
│ 
└── app.ts 
├── package.json 
└── tsconfig.json

## Iniciando o Projeto

Siga os passos abaixo para iniciar o projeto:

### 1. Clone o Repositório

```bash
git clone git@github.com:RawdneyGoncalves/api-avalie-filmes.git
```

Instale as dependências necessárias usando npm:

```bash
npm install
```
## Configuração do Banco de Dados

Docker: Se você não tiver um banco de dados MySQL em execução, você pode iniciá-lo com Docker. Use o seguinte comando:

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=avaliemovies -p 3306:3306 -d mysql:latest
```
### Para criar as tabelas necessárias no banco de dados, execute:

```bash
npm run migration:run
```

## Inicie a Aplicação

```bash
npm run start


A aplicação estará disponível em http://localhost:3000
```

### Acesse a Documentação
```bash
A documentação da API pode ser acessada em: http://localhost:3000/docs
```