import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailOrName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(emailOrName);
    if (
      user &&
      (await this.usersService.validatePassword(pass, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const { password, role, ...result } = user;

    const token = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(token) as any;

    return {
      ...result,
      access_token: this.jwtService.sign(payload),
      expires_at: new Date(decodedToken.exp * 1000).toISOString(),
    };
  }

  async register(body: { email: string; name: string; password: string }) {
    const user = await this.usersService.create(
      body.email,
      body.name,
      body.password,
    );
    const payload = { email: user.email, sub: user.id };
    const { password, role, ...result } = user;

    const token = this.jwtService.sign(payload);
    const decodedToken = this.jwtService.decode(token) as any;

    return {
      ...result,
      access_token: this.jwtService.sign(payload),
      expires_at: new Date(decodedToken.exp * 1000).toISOString(),
    };
  }
}
