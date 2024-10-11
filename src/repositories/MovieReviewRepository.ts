import { injectable } from 'inversify';
import { getRepository, Repository, FindOneOptions } from 'typeorm';
import { IMovieReviewRepository } from '../interfaces/IMovieReviewRepository';
import { MovieReview } from '../models/MovieReview';
import { IFilters } from '../interfaces/IFilters';
import { ISort } from '../interfaces/ISort';

@injectable()
export class MovieReviewRepository implements IMovieReviewRepository {
    private repository: Repository<MovieReview>;

    constructor() {
        this.repository = getRepository(MovieReview);
    }

    async save(review: MovieReview): Promise<MovieReview> {
        return await this.repository.save(review);
    }

    async findAll(filters?: IFilters, sort?: ISort): Promise<MovieReview[]> {
        const query = this.repository.createQueryBuilder('review');

        if (filters) {
            if (filters.title) {
                query.andWhere('review.title LIKE :title', { title: `%${filters.title}%` });
            }
            if (filters.actors) {
                query.andWhere('review.actors LIKE :actors', { actors: `%${filters.actors}%` });
            }
            if (filters.director) {
                query.andWhere('review.director LIKE :director', { director: `%${filters.director}%` });
            }
        }

        if (sort) {
            const { field, order } = sort;
            query.orderBy(`review.${field}`, order.toUpperCase() as 'ASC' | 'DESC');
        }

        return await query.getMany();
    }

    async findById(id: number): Promise<MovieReview | null> {
        const options: FindOneOptions<MovieReview> = { where: { id } };
        return await this.repository.findOne(options) || null;
    }

    async update(id: number, notes: string): Promise<MovieReview | null> {
        const review = await this.findById(id);
        if (!review) return null;
        review.notes = notes;
        return await this.repository.save(review);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
