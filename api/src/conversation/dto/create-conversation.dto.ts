import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';

@InputType()
export class CreateConversationInput {
  @Field(() => [String])
  participants: string[];
}

@ObjectType()
export class CreatedConversation {
  @Field(() => ID)
  id: string;
}
