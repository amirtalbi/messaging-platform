import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProducer } from './message.producer';
import { MessageConsumer } from './message.consumer';
import { PrismaService } from '../prisma.service';
import { UserModule } from 'src/user/user.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { ChatGateway } from 'src/chat/chat.gateway';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [UserModule, RabbitMQModule],
  providers: [
    MessageService,
    MessageResolver,
    MessageProducer,
    MessageConsumer,
    PrismaService,
    ChatGateway,
    RedisService,
  ],
  exports: [MessageProducer, MessageConsumer, MessageService],
})
export class MessageModule {}
