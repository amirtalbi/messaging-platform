import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MessageService } from './message.service';
@Injectable()
export class MessageConsumer {
  constructor(private readonly messageService: MessageService) {}
  private queueId: number;

  async handleUserLoggedIn(username: string) {
    console.log('User logged in:', username);

    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(username);

    await channel.bindQueue(username, 'exchange', 'UserLoggedIn');

    channel.consume(username, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
  }

  async handleMessage(message: any) {
    console.log('Message received:', message);

    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(message.username);

    await channel.bindQueue(message.username, 'exchange', 'routing-key');

    channel.consume(message.username, async (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        await this.messageService.create(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    });
  }
}
