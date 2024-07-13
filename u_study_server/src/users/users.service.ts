import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  async findOne(email: string) {
    return this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
  }
  async create(userCreateInput: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: userCreateInput,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findByUuid(uuid: string) {
    return this.databaseService.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  async update(data: Prisma.UserUpdateInput, uuid: string) {
    try {
      const userUpdated = await this.databaseService.user.update({
        where: {
          uuid,
        },
        data,
      });
      return userUpdated;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
