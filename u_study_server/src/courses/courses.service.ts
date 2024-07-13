import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import {
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { join } from 'path';
import { ArrangeCourseDto } from './dto/arrange-course.dto';

@Injectable()
export class CoursesService {
  constructor(private databaseService: DatabaseService) {}
  async create(createCourseDto: CreateCourseDto) {
    try {
      if (createCourseDto) {
        const course: Prisma.UserUpdateInput = {
          courses: {
            create: {
              title: createCourseDto.title,
              price: Number.parseInt(createCourseDto.price),
              categoryId: Number.parseInt(createCourseDto.categoryId),
              description: createCourseDto.description,
              image:
                createCourseDto.image ??
                'http://localhost:3001/images/default/default-thumbnail.png',
            },
          },
        };
        await this.databaseService.user.update({
          where: {
            uuid: createCourseDto.uuid,
          },
          data: course,
        });
        return course;
      }
    } catch (error) {
      throw new NotAcceptableException();
    }
  }
  async uploadThumbnail(id: number, file: Express.Multer.File) {
    const THUMBNAIL_FOLDER_PATH = 'http://localhost:3001/images/thumbnails';
    try {
      const updatedThumbnail = await this.databaseService.course.update({
        where: {
          id,
        },
        data: {
          image: join(THUMBNAIL_FOLDER_PATH, file.filename),
        },
      });
      return updatedThumbnail;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const courses = await this.databaseService.course.findMany({
        select: {
          id: true,
          uuid: true,
          categoryId: true,
          title: true,
          description: true,
          image: true,
          price: true,
          createdAt: true,
          updateAt: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          category: {
            select: {
              description: true,
            },
          },
          discounts: {
            where: {
              type: 'WITHOUT_COUPON',
            },
            select: {
              id: true,
              percentage: true,
              type: true,
              expiredAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          hidden: false,
        },
      });
      return courses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.databaseService.course.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          uuid: true,
          categoryId: true,
          title: true,
          description: true,
          image: true,
          price: true,
          createdAt: true,
          updateAt: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          category: {
            select: {
              description: true,
            },
          },
          chapters: {
            orderBy: {
              sequenceNumber: 'asc',
            },
            select: {
              id: true,
              courseId: true,
              title: true,
              sequenceNumber: true,
              videos: {
                orderBy: {
                  sequenceNumber: 'asc',
                },
                select: {
                  title: true,
                  duration: true,
                  sequenceNumber: true,
                },
              },
            },
          },
        },
      });
      return course ?? {};
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async countTotalIncome(courseId: number) {
    try {
      const total = await this.databaseService.payment.aggregate({
        where: {
          courseId: courseId,
        },
        _sum: {
          amount: true,
        },
        _count: {
          uuid: true,
        },
      });
      const students = await this.databaseService.payment.findMany({
        where: {
          courseId: courseId,
        },
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          createdAt: true,
        },
      });
      return { ...total, students };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   *  find all user's course
   * @param uuid
   * @returns
   */
  async findByUuidUser(uuid: string) {
    try {
      const courses = await this.databaseService.enrollment.findMany({
        where: {
          uuid: uuid,
        },
        include: {
          course: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      return courses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByUuid(courseId: number, uuid: string) {
    try {
      const courseDetail = await this.databaseService.enrollment.findUnique({
        where: {
          uuid_courseId: {
            uuid: uuid,
            courseId: courseId,
          },
        },
        select: {
          course: {
            include: {
              chapters: {
                include: {
                  videos: {
                    where: {
                      hidden: false,
                    },
                    orderBy: {
                      sequenceNumber: 'asc',
                    },
                    include: {
                      learnings: true,
                    },
                  },
                },
                orderBy: {
                  sequenceNumber: 'asc',
                },
              },
            },
          },
        },
      });
      if (!courseDetail) {
        throw new NotFoundException();
      }
      return courseDetail;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  /**
   * find all teacher's courses
   * @param uuid
   * @returns
   */
  async findByUuidTeacher(uuid: string) {
    try {
      const courses = await this.databaseService.course.findMany({
        where: {
          uuid,
        },
      });
      return courses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByUuidTeacher(courseId: number, uuid: string) {
    try {
      const courseDetail = await this.databaseService.course.findUnique({
        where: {
          id: courseId,
          user: {
            uuid: uuid,
          },
        },
        include: {
          chapters: {
            orderBy: {
              sequenceNumber: 'asc',
            },
            include: {
              videos: {
                orderBy: {
                  sequenceNumber: 'asc',
                },
              },
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
      if (!courseDetail) {
        throw new NotFoundException();
      }
      return courseDetail;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async countTotalCourse() {
    try {
      const total = await this.databaseService.course.aggregate({
        _count: {
          id: true,
        },
      });
      return total;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCourseDto: Prisma.CourseUpdateInput) {
    try {
      const courseUpdate = await this.databaseService.course.update({
        where: { id },
        data: {
          ...updateCourseDto,
          price: +updateCourseDto.price,
        },
      });
      return courseUpdate;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async updateSequenceVideo(courseId: number, data: ArrangeCourseDto[]) {
    try {
      data.forEach((value) => {
        if (!value || !value.id || !value.chapter || !value.sequence) {
          throw new InternalServerErrorException();
        }
      });

      data.forEach(async (value) => {
        await this.databaseService.video.update({
          where: {
            id: value.id,
            chapter: {
              courseId: courseId,
            },
          },
          data: {
            chapterId: value.chapter,
            sequenceNumber: value.sequence,
          },
        });

        await this.databaseService.chapter.update({
          where: {
            id: value.chapter,
          },
          data: {
            sequenceNumber: value.chapter_sequence,
          },
        });
      });
      return {
        success: true,
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const courseDelete = await this.databaseService.course.delete({
        where: { id },
      });
      return courseDelete;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
