import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MessageProducer } from 'src/message/message.producer';
import { UserService } from '../user/user.service';
import { MessageConsumer } from 'src/message/message.consumer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly messageProducer: MessageProducer,
    private readonly messageConsumer: MessageConsumer,
  ) {}

  generateToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    await this.messageProducer.sendMessage({
      event: 'UserLoggedIn',
      data: payload,
    });

    this.messageConsumer.consumeMessages(user.username);

    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
      }),
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

    this.messageConsumer.consumeMessages(username);

    return user;
  }
}
