import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    try {
      const categories = await this.databaseService.category.findMany();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(data: Prisma.CategoryCreateInput) {
    try {
      const category = await this.databaseService.category.create({
        data: data,
      });
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
