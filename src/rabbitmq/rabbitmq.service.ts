import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class RabbitMQService {
  private connection;
  private channel;

  constructor() {
    this.connect();
  }

  private connect() {
    amqp.connect('amqp://rabbitmq:5672', (error0, connection) => {
      if (error0) {
        throw error0;
      }
      this.connection = connection;
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        this.channel = channel;
      });
    });
  }

  public assertQueue(username: string) {
    const queue = `queue_${username}`;
    const options = {
      durable: true,
    };

    this.channel.assertQueue(queue, options, (error2, ok) => {
      if (error2) {
        throw error2;
      }
      console.log(`Queue ${queue} created`);
    });
  }

  public sendToQueue(username: string, message: string) {
    const queue = `queue_${username}`;
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log(`Message sent to ${queue}`);
  }
}
