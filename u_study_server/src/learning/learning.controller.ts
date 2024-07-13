import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { LearningService } from './learning.service';
import { CreateLearningDto } from './dto/create-learning.dto';
import { UpdateLearningDto } from './dto/update-learning.dto';

import { Request } from 'express';

@Controller('learning')
export class LearningController {
  constructor(private readonly learningService: LearningService) {}

  @Post()
  create(@Body() createLearningDto: CreateLearningDto) {
    return this.learningService.create(createLearningDto);
  }

  @Get()
  findAll(@Req() req: Request & { user: { uuid: string } }) {
    return this.learningService.findAll(req.user['uuid']);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) idVideo: number, @Req() req) {
    return this.learningService.findOne(idVideo, req.user['uuid']);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request & { user: { uuid: string } },
    @Body() updateLearningDto: UpdateLearningDto,
  ) {
    return this.learningService.update(
      +id,
      req.user['uuid'],
      updateLearningDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.learningService.remove(+id);
  }
}
