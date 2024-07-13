import { IsInt } from 'class-validator';
export class CreatePaymentDto {
  name: string;
  card_number: string;
  expiration: string;
  cvv: string;
  email: string;
  @IsInt()
  id_course: number;
}
