import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';
import { MessageProducer } from 'src/message/message.producer';
import { MessageConsumer } from 'src/message/message.consumer';

@Module({
  imports: [RabbitMQModule],
  providers: [UserService, UserResolver, PrismaService, AuthService, JwtService, MessageService, MessageProducer, MessageConsumer],
  exports: [UserService],
})
export class UserModule {}
