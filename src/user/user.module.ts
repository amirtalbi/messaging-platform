import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service'; // Import PrismaService
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMQModule],
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
export class UserModule {}
