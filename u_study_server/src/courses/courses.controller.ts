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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Prisma } from '@prisma/client';
import { Public } from 'src/auth/auth.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArrangeCourseDto } from './dto/arrange-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    return this.coursesService.create({
      ...createCourseDto,
      uuid: req['user'].uuid,
    });
  }

  @Public()
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get('total')
  countTotal() {
    return this.coursesService.countTotalCourse();
  }

  @Get('/user')
  findByUuid(@Req() req: Request) {
    return this.coursesService.findByUuidUser(req['user'].uuid);
  }

  @Get('/user/:courseId')
  findOneByUuid(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() req: Request,
  ) {
    return this.coursesService.findOneByUuid(courseId, req['user'].uuid);
  }

  @Get('/teacher')
  findByUuidTeacher(@Req() req: Request) {
    return this.coursesService.findByUuidTeacher(req['user'].uuid);
  }

  @Get('teacher/income/:courseId')
  countTotalIncome(@Req() req: Request) {
    return this.coursesService.countTotalIncome(+req.params.courseId);
  }

  @Get('/teacher/:courseId')
  findOneByUuidTeacher(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() req: Request,
  ) {
    return this.coursesService.findOneByUuidTeacher(courseId, req['user'].uuid);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Patch('/thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updateThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.coursesService.uploadThumbnail(id, file);
  }

  @Patch('/arrange/:id')
  updateSequenceVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    arrangeCourseDto: ArrangeCourseDto[],
  ) {
    return this.coursesService.updateSequenceVideo(id, arrangeCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: Prisma.CourseUpdateInput,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
