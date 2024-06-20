import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service'; // Import PrismaService
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [RabbitMQModule],
  providers: [UserService, UserResolver, PrismaService, AuthService, JwtService],
  exports: [UserService],
})
export class UserModule {}
