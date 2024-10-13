import { DataSource } from "typeorm";
import { MovieReview } from "../models/MovieReview";

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "dolado",
    entities: [MovieReview],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
});

export default AppDataSource;