import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MessageService } from './message.service';

@Injectable()
export class MessageConsumer {
  constructor(private readonly messageService: MessageService) {}

  @RabbitSubscribe({
    exchange: 'exchange',
    routingKey: 'routing-key',
    queue: 'message-queue',
  })
  async handleMessage(message: any) {
    console.log('Message received:', message);
    await this.messageService.create(message);
  }
}
