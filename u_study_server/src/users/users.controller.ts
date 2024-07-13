import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Get profile of a user
  @Get('/profile')
  findOne(@Req() req) {
    return this.usersService.findByUuid(req.user['uuid']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Prisma.UserUpdateInput) {
    return this.usersService.update(body, id);
  }
}
