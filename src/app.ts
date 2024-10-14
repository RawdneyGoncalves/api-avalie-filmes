import 'reflect-metadata';
import Fastify from 'fastify';
import dataSource from './config/ormconfig';
import container from './inversify/inversify.config';
import TYPES from './inversify/types';
import { MovieReviewController } from './controllers/MovieReviewController';
import { errorHandler } from './middlewares/ErrorHandler';
import fastifyOas from 'fastify-oas';
import { FastifyRequest, FastifyReply } from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const app = Fastify({ logger: true });

app.register(fastifyOas, {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'API Avalie Filmes',
            description: 'API para gerenciar anotações de filmes com integração ao OMDB',
            version: '1.0.0',
        },
        host: process.env.SWAGGER_HOST || 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
});

app.setErrorHandler(errorHandler);

const connectWithRetry = async (attempts = 5) => {
    while (attempts) {
        try {
            await dataSource.initialize();
            app.log.info('Conectado ao banco de dados');
            return; 
        } catch (error) {
            app.log.error('Falha ao conectar ao banco de dados:', error);
            attempts -= 1;
            app.log.info(`Tentando novamente... ${attempts} tentativas restantes.`);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    throw new Error('Não foi possível conectar ao banco de dados após várias tentativas.');
};

export const startApp = async () => {
    try {
        await connectWithRetry();

        const movieReviewController = container.get<MovieReviewController>(TYPES.MovieReviewController);

        app.post('/movie-reviews', async (req: FastifyRequest, reply: FastifyReply) => {
            await movieReviewController.createReview(req, reply);
        });

        app.get('/movie-reviews', async (req: FastifyRequest, reply: FastifyReply) => {
            await movieReviewController.getAllReviews(req, reply);
        });

        app.get('/movie-reviews/:id', async (req: FastifyRequest, reply: FastifyReply) => {
            await movieReviewController.getReviewById(req, reply);
        });

        app.put('/movie-reviews/:id', async (req: FastifyRequest, reply: FastifyReply) => {
            await movieReviewController.updateReview(req, reply);
        });

        app.delete('/movie-reviews/:id', async (req: FastifyRequest, reply: FastifyReply) => {
            await movieReviewController.deleteReview(req, reply);
        });

        const listenOptions = {
            port: Number(process.env.PORT) || 3000,
            host: process.env.HOST || '0.0.0.0',
        };

        await app.listen(listenOptions); 
        app.log.info(`Servidor rodando em http://${listenOptions.host}:${listenOptions.port}`);
    } catch (error) {
        app.log.error('Falha ao iniciar a aplicação:', error);
        process.exit(1);
    }
};

startApp();
