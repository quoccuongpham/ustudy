import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  findAll(
    @Req() req: Request & { user: { uuid: string } },
    @Query('note') note?: boolean,
  ) {
    return this.videosService.findAll(req.user.uuid, Boolean(note));
  }

  @Patch(':id')
  updateVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Prisma.VideoUpdateInput,
  ) {
    return this.videosService.updateVideo(id, body);
  }
}
