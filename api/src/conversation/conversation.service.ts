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

  async findByUserId(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        participants: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: true,
        messages: {
          include: {
            sender: true,
          },
        },
      },
    });
  }

  async create(data: CreateConversationInput) {
    return this.prisma.conversation.create({
      data: {
        participants: {
          connect: data.participants.map((id) => ({ id })),
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
