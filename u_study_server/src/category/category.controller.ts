import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CategoryService } from './category.service';
import { Prisma } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  @Public()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body() body: Prisma.CategoryCreateInput) {
    return this.categoryService.create(body);
  }
}
