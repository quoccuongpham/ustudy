export class CreateCommentDto {
  videoId: number;
  content: string;
  parentId?: number;
}
