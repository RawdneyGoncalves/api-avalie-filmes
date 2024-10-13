import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovieReviewTable1711501252565 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "movie_review",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "notes",
                    type: "text"
                },
                {
                    name: "released",
                    type: "date"
                },
                {
                    name: "imdbRating",
                    type: "decimal",
                    precision: 3,
                    scale: 1
                },
                {
                    name: "actors",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "director",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("movie_review");
    }
}