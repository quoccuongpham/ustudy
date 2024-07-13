import { Role } from '@prisma/client';
import { IsEmail } from 'class-validator';
export class RegisterDto {
  name?: string;
  @IsEmail()
  email: string;
  password: string;
  role: Role;
}
