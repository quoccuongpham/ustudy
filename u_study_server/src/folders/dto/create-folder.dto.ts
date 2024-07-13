import { IsNumber, ValidateIf } from 'class-validator';

export class CreateFolderDto {
  name: string;
  @IsNumber()
  @ValidateIf((obj, value) => value != null)
  parentFolderId?: number;
  uuid: string;
  @IsNumber()
  @ValidateIf((obj, value) => value != null)
  courseId?: number;
}
