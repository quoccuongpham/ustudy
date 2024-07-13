import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Request } from 'express';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post()
  create(@Body() body: CreatePaymentDto, @Req() req: Request) {
    return this.paymentService.create(body, req['user'].uuid);
  }

  @Get()
  findAll(@Req() req: Request & { user: { uuid: string } }) {
    return this.paymentService.findAll(req.user.uuid);
  }

  @Get('/admin')
  findAllAdmin() {
    return this.paymentService.findAllAdmin();
  }
}
