import { IsString, MinLength, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateFlatDto {
  @IsString()
  @MinLength(5, { message: 'Name must have at least 5 characters.' })
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}
