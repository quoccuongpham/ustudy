import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount-dto';
import { Public } from 'src/auth/auth.decorator';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() body: CreateDiscountDto) {
    return this.discountService.create(body);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Public()
  @Get('check')
  checkCoupon(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('coupon') coupon: string,
  ) {
    return this.discountService.checkCoupon(courseId, coupon);
  }

  @Get('user')
  findByUser(@Req() req: Request & { user: { uuid: string } }) {
    return this.discountService.findByUser(req['user'].uuid);
  }

  // Get list course with discount
  @Get('course')
  findCourseWithDiscount(@Req() req: Request & { user: { uuid: string } }) {
    return this.discountService.findCourseWithDiscount(req.user.uuid);
  }

  // Get one course with discount
  @Public()
  @Get('course/:id')
  findOneCourseWithDiscount(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.checkCourse(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.discountService.delete(+id);
  }
}
