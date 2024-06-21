import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(data: any): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async login(data: any): Promise<User> {
    return this.prisma.user.findUnique({ where: data });
  }

  async findUsersWithoutConversation(userId: string) {
    return this.prisma.user.findMany({
      where: {
        conversations: {
          none: {
            participants: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
    });
  }
}
