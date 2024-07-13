import { IsNotEmpty, IsNumber } from 'class-validator';

export class ArrangeCourseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  chapter: number;

  @IsNumber()
  @IsNotEmpty()
  sequence: number;

  @IsNumber()
  @IsNotEmpty()
  chapter_sequence: number;
}
