import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.entity';
import {
  CreateConversationInput,
  CreatedConversation,
} from './dto/create-conversation.dto';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations() {
    return this.conversationService.findAll();
  }

  @Query(() => Conversation)
  async conversation(@Args('id', { type: () => String }) id: string) {
    const conversation = await this.conversationService.findOne(id);

    conversation.messages = conversation.messages.filter(
      (message) => message.senderId !== null,
    );

    return conversation;
  }

  @Query(() => [Conversation])
  async conversationByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.conversationService.findByUserId(userId);
  }

  @Mutation(() => CreatedConversation)
  async createConversation(
    @Args('createConversationInput')
    createConversationInput: CreateConversationInput,
  ) {
    return this.conversationService.create(createConversationInput);
  }
}
