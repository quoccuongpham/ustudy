import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { CreateChapterDto } from './dto/create-chapter.dto';
@Injectable()
export class ChaptersService {
  constructor(private databaseService: DatabaseService) {}
  async create(createChapterDto: CreateChapterDto, uuid: string) {
    try {
      const courseRes = await this.databaseService.course.findUnique({
        where: {
          id: createChapterDto.courseId,
          user: {
            uuid: uuid,
          },
        },
        select: {
          chapters: true,
        },
      });
      if (!courseRes) {
        throw new NotAcceptableException();
      }
      const seq = courseRes.chapters.length + 1;

      if (!createChapterDto.sequenceNumber) {
        createChapterDto.sequenceNumber = seq;
      }

      const courseCreate = await this.databaseService.course.update({
        where: {
          id: createChapterDto.courseId,
          user: {
            uuid,
          },
        },
        data: {
          chapters: {
            create: {
              title: createChapterDto.title,
              sequenceNumber: createChapterDto.sequenceNumber,
            },
          },
        },
        select: {
          chapters: {
            orderBy: {
              id: 'desc',
            },
          },
        },
      });

      return courseCreate.chapters[0];
    } catch (error) {
      throw new NotAcceptableException();
    }
  }

  findAll() {
    try {
      // const chapters = await this.databaseService.
      return `This action returns all chapters`;
    } catch (error) {
      //
    }
  }

  findOne(id: number) {
    return this.databaseService.chapter.findMany({
      orderBy: { sequenceNumber: 'asc' },
      where: { courseId: id },
    });
  }

  update(id: number, updateChapterDto: Prisma.ChapterUpdateInput) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
