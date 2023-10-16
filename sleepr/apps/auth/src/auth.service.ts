import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from './users/entities/user.entity.ts/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService) {}
  
  getHello(): string {
    return 'Hello World!';
  }

  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      email: user.email,
    }
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + +this.configService.get('JWT_ACCESS_TOKEN_TTL')
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    })
  }
}
