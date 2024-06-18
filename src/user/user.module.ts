import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service'; // Import PrismaService

@Module({
  providers: [UserService, UserResolver, PrismaService], // Provide PrismaService
})
export class UserModule {}
