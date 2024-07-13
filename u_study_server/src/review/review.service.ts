import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewService {
  constructor(private databaseService: DatabaseService) {}
  async create(createReviewDto: CreateReviewDto, uuid: string) {
    try {
      const createdReview = await this.databaseService.review.create({
        data: {
          ...createReviewDto,
          uuid: uuid,
        },
      });
      return createdReview;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(courseId: number) {
    try {
      const data = await this.databaseService.review.findMany({
        where: {
          courseId: courseId,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async averageRating(courseId: number) {
    try {
      const data = await this.databaseService.review.aggregate({
        where: {
          courseId: courseId,
        },
        _avg: {
          rating: true,
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} review`;
  // }

  // update(id: number, updateReviewDto: UpdateReviewDto) {
  //   return `This action updates a #${id} review`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} review`;
  // }
}
