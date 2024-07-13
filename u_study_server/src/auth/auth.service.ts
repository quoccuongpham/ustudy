import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.usersService.findOne(signInDto.email);
    if (!user?.password) {
      throw new UnauthorizedException();
    } else if (
      (await bcrypt.compare(signInDto.password, user.password)) === false
    ) {
      throw new UnauthorizedException();
    }

    if (user.status === 'BANNED') {
      throw new NotAcceptableException('Your account has been banned');
    }
    const payload = { ...user };
    delete payload.password;
    const access_token = await this.jwtService.signAsync(payload);
    res.cookie('access_token', access_token);
    return {
      uuid: user.uuid,
      access_token: access_token,
      role: payload.role,
      name: payload.name,
      email: payload.email,
      avatarUrl: payload.avatarUrl,
      balance: payload.balance,
    };
  }
  async register(registerDto: RegisterDto) {
    if (await this.usersService.findOne(registerDto.email)) {
      throw new NotAcceptableException('Email already exist');
    }
    const saltOrRounds = 10;
    const hash: string = await bcrypt.hash(registerDto.password, saltOrRounds);
    return this.usersService.create({ ...registerDto, password: hash });
  }
}
