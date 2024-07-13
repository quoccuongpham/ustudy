import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  getAll(
    @Query('videoId') videoId?: string,
    @Query('courseId') courseId?: string,
  ) {
    if (videoId) {
      return this.commentService.findAll(+videoId);
    } else if (courseId) {
      return this.commentService.findByCourse(+courseId);
    }
  }
  @Post()
  create(@Body() body: CreateCommentDto, @Req() req) {
    return this.commentService.create(body, req.user['uuid']);
  }
}
