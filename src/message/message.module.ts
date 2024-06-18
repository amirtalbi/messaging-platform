import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProducer } from './message.producer';
import { MessageConsumer } from './message.consumer';
import { PrismaService } from '../prisma.service'; // Import PrismaService
import { UserModule } from 'src/user/user.module';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    UserModule,
    RabbitMQModule
  ],
  providers: [MessageService, MessageResolver, MessageProducer, MessageConsumer, PrismaService], // Provide PrismaService
})
export class MessageModule {}
