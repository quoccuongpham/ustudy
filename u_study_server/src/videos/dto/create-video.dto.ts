import { IsNumber } from 'class-validator';

export class Video {
  title: string;
  url: string;
  @IsNumber()
  duration: number;
  @IsNumber()
  chapterId: number;
}

export default class CreateVideoDto {
  @IsNumber()
  courseId: number;
  videos: Video[];
}
