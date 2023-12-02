import { IsString, MinLength, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateFlatDto {
  @IsString()
  @MinLength(5, { message: 'Title must have at least 5 characters.' })
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}
