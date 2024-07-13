import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Request } from 'express';
import { CreateScheduleDto } from './dto/create-schedule-dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(
    @Body() body: CreateScheduleDto,
    @Req() req: Request & { user: { uuid: string } },
  ) {
    return this.scheduleService.create(body, req.user.uuid);
  }

  @Get('user')
  findAll(@Req() req: Request & { user: { uuid: string } }) {
    return this.scheduleService.findByUser(req.user.uuid);
  }
}
