import { DataSource } from "typeorm";
import { MovieReview } from "../models/MovieReview";

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5055,
    username: process.env.DB_USER || "root", 
    password: process.env.DB_PASSWORD || "root123",
    database: process.env.DB_NAME || "sys",
    entities: [MovieReview],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
    connectTimeout: 60000, 
    extra: {
        connectionLimit: 5 
    },
});

export default AppDataSource;
