import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { MovieReview } from '../models/MovieReview';

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'dolado',
    entities: [MovieReview],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    logging: false,
});

export default dataSource;
