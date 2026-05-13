import { IsString, IsInt, Length } from 'class-validator';

export class CreateEventDto {

  @IsString({ message: 'Event name must be a string' })
  @Length(1, 120, { message: 'Event name must be between 1 and 120 characters' })
  eventname: string;

  @IsString({ message: 'Event name must be a string' })
  @Length(1, 120, { message: 'images must be between 1 and 120 characters' })
  images: string;

  @IsString({ message: 'Artist must be a string' })
  @Length(1, 120, { message: 'Artist must be between 1 and 120 characters' })
  artist: string;

  @IsString({ message: 'Location must be a string' })
  @Length(1, 120, { message: 'Location must be between 1 and 120 characters' })
  location: string;

  @IsString({ message: 'Date must be a string' })
  date: string;

}