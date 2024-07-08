import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { MessageService } from './message.service';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class MessageConsumer {
  constructor(
    private readonly messageService: MessageService,
    private readonly redisService: RedisService,
  ) {}

  async handleUserLoggedIn(username: string) {
    console.log('User logged in:', username);

    const connection = await amqp.connect('amqp://guest:guest@localhost:5672');
    const channel = await connection.createChannel();
    channel.assertQueue(username, (error2, ok) => {
      if (error2) {
        throw error2;
      }
      console.log(`Queue ${username} created`);
    });

    await channel.bindQueue(username, 'exchange', 'UserLoggedIn');

    const options = {
      durable: true,
    };

    channel.consume(username, options, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
      }
    });
  }

  async handleMessage(message: any) {
    console.log('Message received:', message);

    await this.redisService.enqueueMessage(
      message.username,
      JSON.stringify(message),
    );
  }

  async consumeMessages(username: string) {
    const queueName = username;

    while (true) {
      const message = await this.redisService.dequeueMessage(queueName);
      if (message) {
        console.log('Message dequeued:', message);

        await this.messageService.create(JSON.parse(message));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }
}
