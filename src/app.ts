import 'reflect-metadata';
import Fastify from 'fastify';
import dataSource from './config/ormconfig';
import container from './inversify/inversify.config';
import TYPES from './inversify/types';
import { MovieReviewController } from './controllers/MovieReviewController';
import { errorHandler } from './middlewares/ErrorHandler';
import fastifyOas from 'fastify-oas';
import { FastifyRequest, FastifyReply } from 'fastify';

const app = Fastify({ logger: true });

app.register(fastifyOas, {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'API Avalie Filmes',
            description: 'API para gerenciar anotações de filmes com integração ao OMDB',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
});

app.setErrorHandler(errorHandler);

export const startApp = async () => {
    try {
        await dataSource.initialize();
        app.log.info('Conectado ao banco de dados');

        const movieReviewController = container.get<MovieReviewController>(TYPES.MovieReviewController);

        app.post('/movie-reviews', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.createReview(req, reply));
        app.get('/movie-reviews', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.getAllReviews(req, reply));
        app.get('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.getReviewById(req, reply));
        app.put('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.updateReview(req, reply));
        app.delete('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.deleteReview(req, reply));

        const listenOptions = {
            port: 3000,
            host: '0.0.0.0',
        };

        await app.listen(listenOptions);
        app.log.info(`Servidor rodando em http://${listenOptions.host}:${listenOptions.port}`);
    } catch (error) {
        app.log.error('Falha ao iniciar a aplicação:', error);
        process.exit(1);
    }
};

startApp()