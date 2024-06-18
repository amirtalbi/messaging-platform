import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class MessageProducer {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendMessage(message: any) {
    await this.amqpConnection.publish('exchange', 'routing-key', message);
  }
}
