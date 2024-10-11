import 'reflect-metadata';
import { MovieReviewService } from '../../services/MovieReviewService';
import { IMovieReviewRepository } from '../../interfaces/IMovieReviewRepository';
import { OMDBClient } from '../../utils/OMDBClient';
import { MovieReview } from '../../models/MovieReview';

describe('MovieReviewService', () => {
    let service: MovieReviewService;
    let mockRepository: IMovieReviewRepository;
    let mockOMDBClient: OMDBClient;

    beforeEach(() => {
        mockRepository = {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };

        mockOMDBClient = {
            fetchMovieByTitle: jest.fn(),
        } as unknown as OMDBClient;

        service = new MovieReviewService(mockRepository, mockOMDBClient);
    });

    it('should create a movie review', async () => {
        const title = 'Inception';
        const notes = 'Great movie!';
        const omdbData = { Released: '16 Jul 2010', imdbRating: '8.8', Actors: 'Leonardo DiCaprio', Director: 'Christopher Nolan' };

        (mockOMDBClient.fetchMovieByTitle as jest.Mock).mockResolvedValue(omdbData);
        (mockRepository.save as jest.Mock).mockImplementation((review: MovieReview) => Promise.resolve(review));

        const review = await service.createReview(title, notes);

        expect(mockOMDBClient.fetchMovieByTitle).toHaveBeenCalledWith(title);
        expect(mockRepository.save).toHaveBeenCalled();
        expect(review.title).toBe(title);
        expect(review.notes).toBe(notes);
        expect(review.released).toBe(omdbData.Released);
        expect(review.imdbRating).toBe(omdbData.imdbRating);
        expect(review.actors).toBe(omdbData.Actors);
        expect(review.director).toBe(omdbData.Director);
    });
});
