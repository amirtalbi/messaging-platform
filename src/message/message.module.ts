import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProducer } from './message.producer';
import { MessageConsumer } from './message.consumer';
import { PrismaService } from '../prisma.service'; // Import PrismaService
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost',
    }),
  ],
  providers: [MessageService, MessageResolver, MessageProducer, MessageConsumer, PrismaService], // Provide PrismaService
})
export class MessageModule {}
