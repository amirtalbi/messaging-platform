import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.message.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.message.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
