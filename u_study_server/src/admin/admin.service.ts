import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AdminService {
  constructor(private databaseService: DatabaseService) {}

  async getProfile(uuid: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        uuid,
      },
    });
    if (user.role === 'ADMIN') {
      return {
        user,
      };
    } else if (user.role === 'TEACHER') {
      const courses = await this.databaseService.course.findMany({
        where: {
          uuid: uuid,
        },
        include: {
          _count: {
            select: {
              payments: true,
            },
          },
          category: true,
        },
      });
      return {
        user: user,
        courses: courses,
      };
    } else if (user.role === 'STUDENT') {
      const courses = await this.databaseService.enrollment.findMany({
        where: {
          uuid: uuid,
        },
        include: {
          course: true,
        },
      });
      return {
        user,
        courses,
      };
    }
  }
}
