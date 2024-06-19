import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { UserService } from 'src/user/user.service';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Resolver((of) => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Query((returns) => [Message])
  async messages() {
    return this.messageService.findAll();
  }

  @Query((returns) => Message)
  async message(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation((returns) => Message)
  async createMessage(
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('conversationId') conversationId: string,
  ) {
    const user = await this.userService.findOne(senderId);
    this.rabbitMQService.sendToQueue(user.username, content);
    return this.messageService.create({ content, senderId, conversationId });
  }
}
