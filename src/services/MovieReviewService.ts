import { inject, injectable } from 'inversify';
import { IMovieReviewService } from '../interfaces/IMovieReviewService';
import { IMovieReviewRepository } from '../interfaces/IMovieReviewRepository';
import TYPES from '../inversify/types';
import { MovieReview } from '../models/MovieReview';
import { OMDBClient } from '../utils/OMDBClient';
import { IFilters } from '../interfaces/IFilters';
import { ISort } from '../interfaces/ISort';

@injectable()
export class MovieReviewService implements IMovieReviewService {
    private repository: IMovieReviewRepository;
    private omdbClient: OMDBClient;

    constructor(
        @inject(TYPES.IMovieReviewRepository) repository: IMovieReviewRepository,
        @inject(TYPES.OMDBClient) omdbClient: OMDBClient
    ) {
        this.repository = repository;
        this.omdbClient = omdbClient;
    }

    async createReview(title: string, notes: string): Promise<MovieReview> {
        const movieData = await this.omdbClient.fetchMovieByTitle(title);
        const review = new MovieReview();
        review.title = title;
        review.notes = notes;
        review.released = movieData.Released;
        review.imdbRating = movieData.imdbRating;
        review.actors = movieData.Actors;
        review.director = movieData.Director;

        return await this.repository.save(review);
    }

    async getAllReviews(filters?: IFilters, sort?: ISort): Promise<MovieReview[]> {
        return await this.repository.findAll(filters, sort);
    }

    async getReviewById(id: number): Promise<MovieReview | null> {
        return await this.repository.findById(id);
    }

    async updateReview(id: number, notes: string): Promise<MovieReview | null> {
        return await this.repository.update(id, notes);
    }

    async deleteReview(id: number): Promise<boolean> {
        return await this.repository.delete(id);
    }
}