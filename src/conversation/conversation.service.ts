import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateConversationInput } from './dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.conversation.findMany({
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: true,
        messages: true,
      },
    });
  }

  async create(data: CreateConversationInput) {
    return this.prisma.conversation.create({
      data: {
        participants: {
          connect: data.participants.map(id => ({ id })),
        },
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.conversation.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.conversation.delete({ where: { id } });
  }
}
