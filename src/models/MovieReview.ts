import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MovieReview {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title!: string;

    @Column({ type: 'text' })
    notes!: string;

    @Column({ type: 'date' })
    released!: string;

    @Column({ type: 'decimal', precision: 3, scale: 1 })
    imdbRating!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    actors?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    director?: string;
}