import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { Prisma } from '@prisma/client';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { Request } from 'express';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() createChapterDto: CreateChapterDto, @Req() req: Request) {
    return this.chaptersService.create(createChapterDto, req['user'].uuid);
  }

  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chaptersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChapterDto: Prisma.ChapterUpdateInput,
  ) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chaptersService.remove(+id);
  }
}
