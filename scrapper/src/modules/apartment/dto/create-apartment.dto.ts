import { IsString, MinLength, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateApartmentDto {
  //NOTE: This are really basic, some attention should be put into these
  //      if this should be used in 'production'
  @IsString()
  @MinLength(5, { message: 'Title must have at least 5 characters.' })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(5, { message: 'Location must have at least 5 characters.' })
  @IsNotEmpty()
  location: string;

  @IsString()
  @MinLength(5, { message: 'Size must have at least 5 characters.' })
  @IsNotEmpty()
  size: string;

  @IsString()
  @MinLength(5, { message: 'Price must have at least 5 characters.' })
  @IsNotEmpty()
  price: string;

  @IsUrl()
  @IsNotEmpty()
  image_url: string;
}
