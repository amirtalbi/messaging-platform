import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Import UserService
import * as bcrypt from 'bcrypt';
import { MessageProducer } from 'src/message/message.producer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly messageProducer: MessageProducer,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    await this.messageProducer.sendMessage({
      event: 'UserLoggedIn',
      data: payload,
    });
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userService.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.messageProducer.sendMessage({
      event: 'UserCreated',
      data: user,
    });
    return user;
  }
}