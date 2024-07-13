export class CreateDiscountDto {
  courseId: number;
  percentage: number;
  type: 'WITH_COUPON' | 'WITHOUT_COUPON';
  expiredAt: string;
  createdAt: string;
}
