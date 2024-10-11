import { MovieReview } from '../models/MovieReview';
import { IFilters } from './IFilters';
import { ISort } from './ISort';

export interface IMovieReviewRepository {
    save(review: MovieReview): Promise<MovieReview>;
    findAll(filters?: IFilters, sort?: ISort): Promise<MovieReview[]>;
    findById(id: number): Promise<MovieReview | null>;
    update(id: number, notes: string): Promise<MovieReview | null>;
    delete(id: number): Promise<boolean>;
}