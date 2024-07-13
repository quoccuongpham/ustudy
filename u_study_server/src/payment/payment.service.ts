import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private databaseService: DatabaseService) {}
  async create(data: CreatePaymentDto, uuid: string) {
    try {
      const course = await this.databaseService.course.findUnique({
        where: {
          id: data.id_course,
        },
        select: {
          price: true,
          uuid: true,
        },
      });
      const paymentCreate = await this.databaseService.payment.create({
        data: {
          amount: course.price,
          courseId: data.id_course,
          uuid: uuid,
        },
      });
      const enrollCreate = await this.databaseService.enrollment.create({
        data: {
          uuid: uuid,
          courseId: data.id_course,
        },
      });
      const balanceUpdate = await this.databaseService.user.update({
        where: {
          uuid: course.uuid,
        },
        data: {
          balance: {
            increment: course.price,
          },
        },
      });

      const transationCreated = await this.databaseService.transaction.create({
        data: {
          amount: course.price,
          uuid: uuid,
          type: 'PAYMENT',
          status: 'SUCCESS',
        },
      });
      console.log(balanceUpdate);
      console.log(transationCreated);
      return {
        ...paymentCreate,
        ...enrollCreate,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(uuid: string) {
    try {
      return this.databaseService.payment.findMany({
        where: {
          course: {
            uuid: uuid,
          },
        },
        include: {
          course: {
            select: {
              title: true,
              category: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllAdmin() {
    try {
      const data = await this.databaseService.payment.findMany({
        include: {
          course: {
            select: {
              title: true,
              category: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
