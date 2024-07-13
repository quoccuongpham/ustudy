import { IsInt, ValidateIf } from 'class-validator';

export class CreateNoteDto {
  title: string;
  content: string;
  @IsInt()
  @ValidateIf((obj, value) => value != null)
  folderId?: number;
  uuid: string;
  @IsInt()
  @ValidateIf((obj, value) => value != null)
  videoId?: number;
  @IsInt()
  @ValidateIf((obj, value) => value != null)
  courseId: number;
  time: number;
}
