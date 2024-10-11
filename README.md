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

