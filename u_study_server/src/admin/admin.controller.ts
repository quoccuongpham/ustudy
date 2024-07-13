import { Controller, Get, Query } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  getProfile(@Query('uuid') uuid: string) {
    return this.adminService.getProfile(uuid);
  }
}
