import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ChartService {
  constructor(private databaseService: DatabaseService) {}
  async findEnrollment(id: number) {
    try {
      const result = await this.databaseService.enrollment.findMany({
        where: {
          courseId: id,
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
