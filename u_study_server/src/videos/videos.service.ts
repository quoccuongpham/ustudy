import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class VideosService {
  constructor(private databaseService: DatabaseService) {}
  async findAll(uuid: string, note?: boolean) {
    return {
      uuid,
      note,
    };
  }

  async updateVideo(id: number, updateVideoDto: Prisma.VideoUpdateInput) {
    try {
      const updatedVideo = await this.databaseService.video.update({
        where: {
          id: id,
        },
        data: updateVideoDto,
      });
      console.log(updatedVideo);
      return updateVideoDto;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
