import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private databaseService: DatabaseService) {}
  async create(data: CreateCommentDto, uuid: string) {
    try {
      let dataCreate: Prisma.CommentCreateInput;
      if (data.parentId) {
        dataCreate = {
          content: data.content,
          user: {
            connect: {
              uuid: uuid,
            },
          },
          video: {
            connect: {
              id: data.videoId,
            },
          },
          parent: {
            connect: {
              id: +data.parentId,
            },
          },
        };
      } else {
        dataCreate = {
          content: data.content,
          user: {
            connect: {
              uuid: uuid,
            },
          },
          video: {
            connect: {
              id: data.videoId,
            },
          },
        };
      }

      const createdComment = await this.databaseService.comment.create({
        data: dataCreate,
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      return createdComment;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }
  async findAll(videoId: number) {
    try {
      const data = await this.databaseService.comment.findMany({
        where: {
          videoId: videoId,
          parentId: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          children: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                  avatarUrl: true,
                },
              },
            },
          },
          user: {
            select: {
              email: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findByCourse(courseId: number) {
    try {
      const data = this.databaseService.comment.findMany({
        where: {
          video: {
            chapter: {
              course: {
                id: courseId,
              },
            },
          },
          parentId: null,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              avatarUrl: true,
            },
          },
          children: {
            include: {
              user: {
                select: {
                  email: true,
                  name: true,
                  avatarUrl: true,
                },
              },
            },
          },
          video: {
            select: {
              title: true,
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
