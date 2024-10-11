import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMovieReviewDTO {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    notes!: string;
}