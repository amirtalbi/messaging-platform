import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProducer } from './message.producer';
import { MessageConsumer } from './message.consumer';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [MessageService, MessageResolver, MessageProducer, MessageConsumer, PrismaService],
})
export class MessageModule {}
