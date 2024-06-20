import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service'; // Import UserService
import * as bcrypt from 'bcrypt';
import { MessageProducer } from 'src/message/message.producer';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly messageProducer: MessageProducer,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.userService.findOneByEmail(email);
  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  generateToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    console.log(payload)
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    await this.messageProducer.sendMessage({
      event: 'UserLoggedIn',
      data: payload,
    });
    return {
      access_token: jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      )
    };
  }

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userService.create({
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
