import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMovieReviewDTO {
    @IsString()
    @IsNotEmpty()
    notes!: string;
}