import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@Resolver(of => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(returns => [Message])
  async messages() {
    return this.messageService.findAll();
  }

  @Query(returns => Message)
  async message(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation(returns => Message)
  async createMessage(
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('conversationId') conversationId: string,
  ) {
    return this.messageService.create({ content, senderId, conversationId });
  }
}
