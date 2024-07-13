import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChartService } from './chart.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}
  @Public()
  @Get('enrollment/:id')
  findEnrollment(@Param('id', ParseIntPipe) id: number) {
    return this.chartService.findEnrollment(id);
  }
}
