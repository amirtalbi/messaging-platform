import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'redis',
      port: 6379,
    });
  }

  async enqueueMessage(queueName: string, message: string) {
    await this.redisClient.lpush(queueName, message);
  }

  async dequeueMessage(queueName: string): Promise<string | null> {
    return await this.redisClient.rpop(queueName);
  }
}