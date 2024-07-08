import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { ChatGateway } from 'src/chat/chat.gateway';
import { MessageConsumer } from 'src/message/message.consumer';
import { MessageProducer } from 'src/message/message.producer';
import { MessageService } from 'src/message/message.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { PrismaService } from '../prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [RabbitMQModule],
  providers: [
    UserService,
    UserResolver,
    PrismaService,
    AuthService,
    JwtService,
    MessageService,
    MessageProducer,
    MessageConsumer,
    ChatGateway,
    RedisService,
  ],
  exports: [UserService],
})
export class UserModule {}
