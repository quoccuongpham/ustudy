import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLearningDto } from './dto/create-learning.dto';
import { UpdateLearningDto } from './dto/update-learning.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LearningService {
  constructor(private databaseService: DatabaseService) {}
  create(createLearningDto: CreateLearningDto) {
    return 'This action adds a new learning';
  }

  findAll(uuid: string) {
    return this.databaseService.learning.findMany({
      where: {
        uuid: uuid,
      },
    });
  }

  async findOne(idVideo: number, uuid: string) {
    try {
      const learning = await this.databaseService.learning.findUnique({
        where: {
          videoId_uuid: {
            videoId: idVideo,
            uuid: uuid,
          },
        },
      });
      return learning;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, uuid: string, updateLearningDto: UpdateLearningDto) {
    console.log(updateLearningDto);
    const updatedLearning = this.databaseService.learning.update({
      where: {
        videoId_uuid: {
          videoId: id,
          uuid: uuid,
        },
      },
      data: updateLearningDto,
    });
    return updatedLearning;
  }

  remove(id: number) {
    return `This action removes a #${id} learning`;
  }
}
