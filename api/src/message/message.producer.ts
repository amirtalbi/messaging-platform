import { Injectable } from '@nestjs/common';
import { MessageConsumer } from './message.consumer';

@Injectable()
export class MessageProducer {
  constructor(private readonly messageConsumer: MessageConsumer) {}

  async sendMessage(message: any) {
    await this.messageConsumer.handleMessage(message);
  }
}
