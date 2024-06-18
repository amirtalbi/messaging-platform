import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';

@Resolver(of => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(returns => [Conversation])
  async conversations() {
    return this.conversationService.findAll();
  }

  @Query(returns => Conversation)
  async conversation(@Args('id') id: string) {
    return this.conversationService.findOne(id);
  }

  @Mutation(returns => Conversation)
  async createConversation(
    @Args('participants') participants: string[],
  ) {
    return this.conversationService.create({ participants });
  }
}
