import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';

export class GetAllReviewsQueryDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    actors?: string;

    @IsOptional()
    @IsString()
    director?: string;

    @IsOptional()
    @IsIn(['released', 'imdbRating'])
    sortBy?: 'released' | 'imdbRating';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';

    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
}