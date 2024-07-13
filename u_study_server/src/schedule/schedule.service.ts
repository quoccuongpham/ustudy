import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

import { CreateScheduleDto } from './dto/create-schedule-dto';
@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService) {}
  async create(data: CreateScheduleDto, uuid: string) {
    try {
      const scheduleCreated = await this.databaseService.schedule.upsert({
        where: {
          courseId_uuid: {
            courseId: +data.courseId,
            uuid,
          },
        },
        create: {
          courseId: +data.courseId,
          day: data.day,
          end: data?.end,
          time: data?.time,
          uuid,
        },
        update: {
          day: data.day,
          end: data?.end,
          time: data?.time,
        },
      });
      return scheduleCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findByUser(id: string) {
    return this.databaseService.schedule.findMany({
      where: {
        uuid: id,
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}
