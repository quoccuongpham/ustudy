import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import type { Response } from 'express';
import { SubtitleService } from './subtitle.service';

import { Public } from 'src/auth/auth.decorator';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('subtitle')
export class SubtitleController {
  constructor(private readonly subtitleService: SubtitleService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { idVideo: string },
  ) {
    console.log(body);
    return this.subtitleService.create(file, body);
  }

  @Public()
  @Get()
  findAll(
    @Query('idVideo') idVideo?: string,
    @Query('search') search?: string,
  ) {
    return this.subtitleService.findAll(idVideo, search);
  }

  @Public()
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      console.log(id);
      if (!existsSync(join(__dirname, '..', '..', 'upload', 'subtitle', id))) {
        return null;
      }
      const subtitleUrl = await this.subtitleService.findOne(+id);
      const file = createReadStream(join(__dirname, '..', '..', subtitleUrl));
      res.set({
        'Content-Type': 'text/vtt',
        'Content-Disposition':
          'attachment; filename="1713002164214-video1.vtt"',
      });
      return new StreamableFile(file);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
