FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["/bin/sh", "-c", "/usr/local/bin/wait-for-it.sh db:3306 -- npm run migration:run && npm start"]