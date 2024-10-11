import 'reflect-metadata';
import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { MovieReviewController } from '../../controllers/MovieReviewController';
import { IMovieReviewService } from '../../interfaces/IMovieReviewService';
import TYPES from '../../inversify/types';
import { MovieReview } from '../../models/MovieReview';
import container from '../../inversify/inversify.config';
import supertest from 'supertest';

describe('MovieReviewController', () => {
    let app: FastifyInstance;
    let mockService: IMovieReviewService;

    beforeAll(() => {
        mockService = {
            createReview: jest.fn(),
            getAllReviews: jest.fn(),
            getReviewById: jest.fn(),
            updateReview: jest.fn(),
            deleteReview: jest.fn(),
        };

        container.rebind<IMovieReviewService>(TYPES.IMovieReviewService).toConstantValue(mockService);
    });

    beforeEach(async () => {
        app = Fastify();

        const movieReviewController = container.get<MovieReviewController>(TYPES.MovieReviewController);

        app.post('/movie-reviews', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.createReview(req, reply));
        app.get('/movie-reviews', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.getAllReviews(req, reply));
        app.get('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.getReviewById(req, reply));
        app.put('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.updateReview(req, reply));
        app.delete('/movie-reviews/:id', (req: FastifyRequest, reply: FastifyReply) => movieReviewController.deleteReview(req, reply));

        await app.ready();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('POST /movie-reviews - should create a review', async () => {
        const review: MovieReview = {
            id: 1,
            title: 'Inception',
            notes: 'Great movie!',
            released: '16 Jul 2010',
            imdbRating: '8.8',
            actors: 'Leonardo DiCaprio',
            director: 'Christopher Nolan',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (mockService.createReview as jest.Mock).mockResolvedValue(review);

        const response = await supertest(app.server)
            .post('/movie-reviews')
            .send({ title: 'Inception', notes: 'Great movie!' })
            .expect(201);

        expect(response.body.title).toBe('Inception');
        expect(response.body.notes).toBe('Great movie!');
        expect(response.body.released).toBe('16 Jul 2010');
        expect(response.body.imdbRating).toBe('8.8');
        expect(response.body.actors).toBe('Leonardo DiCaprio');
        expect(response.body.director).toBe('Christopher Nolan');
    });
});
