import { MovieReview } from '../models/MovieReview';
import { IFilters } from './IFilters';
import { ISort } from './ISort';

export interface IMovieReviewService {
    createReview(title: string, notes: string): Promise<MovieReview>;
    getAllReviews(filters?: IFilters, sort?: ISort): Promise<MovieReview[]>;
    getReviewById(id: number): Promise<MovieReview | null>;
    updateReview(id: number, notes: string): Promise<MovieReview | null>;
    deleteReview(id: number): Promise<boolean>;
}