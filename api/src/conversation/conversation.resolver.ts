import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
import { CreateConversationInput } from './dto/create-conversation.dto';

@Resolver(of => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(returns => [Conversation])
  async conversations() {
    return this.conversationService.findAll();
  }

  @Query(returns => Conversation)
  async conversation(@Args('id', { type: () => String }) id: string) {
    return this.conversationService.findOne(id);
  }

  @Query(returns => Conversation)
  async conversationByUserId(@Args('userId', { type: () => String }) userId: string) {
    return this.conversationService.findByUserId(userId);
  }

  @Mutation(returns => Conversation)
  async createConversation(
    @Args('createConversationInput') createConversationInput: CreateConversationInput,
  ) {
    return this.conversationService.create(createConversationInput);
  }
}
