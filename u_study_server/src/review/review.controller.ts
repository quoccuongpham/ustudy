import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
import { Request } from 'express';
import { Public } from 'src/auth/auth.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.reviewService.create(createReviewDto, req.user.uuid);
  }

  @Get()
  findAll(@Query('courseId', ParseIntPipe) courseId: number) {
    return this.reviewService.findAll(courseId);
  }

  @Public()
  @Get('averageRating/:courseId')
  averageRating(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.reviewService.averageRating(courseId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reviewService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  //   return this.reviewService.update(+id, updateReviewDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reviewService.remove(+id);
  // }
}
