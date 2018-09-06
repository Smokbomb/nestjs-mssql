import { IsString, IsInt } from 'class-validator';
export class CreatePhotoDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly description?: string;
    @IsString()
    readonly filename?: string;
    @IsInt()
    readonly views?: number;
    @IsInt()
    readonly isPublished?: number;
}