import { Controller, Get, Post, Patch, Req, Body, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';

import { Request } from 'express';
import { Prisma } from '@prisma/client';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('user')
  findByUser(@Req() req: Request & { user: { uuid: string } }) {
    return this.transactionService.findByUser(req.user.uuid);
  }

  @Post('withdraw')
  withdraw(@Req() req: Request & { user: { uuid: string } }) {
    const data = { uuid: req.user.uuid };
    return this.transactionService.withdraw(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.TransactionUpdateInput) {
    return this.transactionService.update(+id, data);
  }
}
