import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateDiscountDto } from './dto/create-discount-dto';

import * as voucher_codes from 'voucher-code-generator';

@Injectable()
export class DiscountService {
  constructor(private databaseService: DatabaseService) {}
  async create(data: CreateDiscountDto) {
    try {
      let coupon: string | null = null;

      if (data.type === 'WITH_COUPON') {
        const coupons = voucher_codes.generate({
          length: 12,
          count: 1,
          pattern: '###-###-###-###',
        });

        coupon = coupons[0];
      }

      const discountCreated = await this.databaseService.discount.upsert({
        where: {
          courseId_type: {
            courseId: +data.courseId,
            type: data.type,
          },
        },
        create: {
          courseId: +data.courseId,
          coupon: coupon,
          percentage: data.percentage,
          type: data.type,
          expiredAt: new Date(data.expiredAt),
        },
        update: {
          coupon: coupon,
          percentage: data.percentage,
          type: data.type,
          expiredAt: new Date(data.expiredAt),
        },
        include: {
          course: true,
        },
      });
      return discountCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const discounts = await this.databaseService.discount.findMany();
      return discounts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByUser(uuid: string) {
    try {
      const discounts = await this.databaseService.discount.findMany({
        where: {
          course: {
            user: {
              uuid: uuid,
            },
          },
        },
        include: {
          course: true,
        },
      });
      return discounts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findCourseWithDiscount(uuid: string) {
    try {
      const courses = await this.databaseService.course.findMany({
        where: {
          uuid: uuid,
        },
        include: {
          discounts: true,
        },
        orderBy: {
          updateAt: 'desc',
        },
      });
      return courses;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: number) {
    try {
      const discountDeteled = await this.databaseService.discount.delete({
        where: {
          id: id,
        },
      });
      return discountDeteled;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkCoupon(courseId: number, coupon: string) {
    try {
      const discount = await this.databaseService.discount.findFirst({
        where: {
          coupon: coupon,
          courseId: courseId,
        },
      });
      return discount;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async checkCourse(courseId: number) {
    try {
      const discount = await this.databaseService.discount.findFirst({
        where: {
          courseId: courseId,
          type: 'WITHOUT_COUPON',
        },
      });
      return discount;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
