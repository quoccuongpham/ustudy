import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@plussub/srt-vtt-parser';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubtitleService {
  constructor(private databaseService: DatabaseService) {}
  async create(file: Express.Multer.File, body: { idVideo: string }) {
    try {
      const { entries } = parse(
        fs.readFileSync(path.join(__dirname, '..', '..', file.path), 'utf8'),
      );

      const data: Prisma.SubtitleCreateManyInput[] = entries.map((entry) => ({
        from: entry.from,
        to: entry.to,
        text: entry.text,
        videoId: +body.idVideo,
      }));
      await this.databaseService.video.update({
        where: {
          id: +body.idVideo,
        },
        data: {
          subtitleUrl: file.path,
        },
      });
      await this.databaseService.subtitle.createMany({ data });
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(idVideo?: string, search?: string) {
    try {
      if (idVideo && search) {
        const subtitleSearched = await this.databaseService.subtitle.findMany({
          where: {
            videoId: +idVideo,
            text: {
              contains: search,
            },
          },
        });
        return subtitleSearched;
      }
      return { found: false };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const { subtitleUrl } = await this.databaseService.video.findUnique({
        where: {
          id: id,
        },
        select: {
          subtitleUrl: true,
        },
      });
      return subtitleUrl;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
