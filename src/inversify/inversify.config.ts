import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import { IMovieReviewService } from '../interfaces/IMovieReviewService';
import { MovieReviewService } from '../services/MovieReviewService';
import { IMovieReviewRepository } from '../interfaces/IMovieReviewRepository';
import { MovieReviewRepository } from '../repositories/MovieReviewRepository';
import { OMDBClient } from '../utils/OMDBClient';
import { MovieReviewController } from '../controllers/MovieReviewController';

const container = new Container();

container.bind<IMovieReviewRepository>(TYPES.IMovieReviewRepository).to(MovieReviewRepository);
container.bind<IMovieReviewService>(TYPES.IMovieReviewService).to(MovieReviewService);
container.bind<OMDBClient>(TYPES.OMDBClient).to(OMDBClient);
container.bind<MovieReviewController>(TYPES.MovieReviewController).to(MovieReviewController);

export default container;