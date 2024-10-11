FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copiar todos os arquivos do projeto para dentro do container
COPY . .

# Rodar o build do TypeScript (garante que os arquivos em dist/ existam)
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação, aguardando o banco de dados
CMD ["/usr/local/bin/wait-for-it.sh", "db:3306", "--", "npm", "start"]
