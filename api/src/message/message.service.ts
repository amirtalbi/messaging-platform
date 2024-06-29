import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatGateway: ChatGateway,
  ) {}

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  async create(data: any) {
    const message = this.prisma.message.create({ data });

    this.chatGateway.emitNewMessageTrigger(data.conversationId);

    return message;
  }

  async update(id: string, data: any) {
    return this.prisma.message.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
