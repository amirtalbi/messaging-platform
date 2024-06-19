import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from '../message/message.entity';
import { User } from '../user/user.entity';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => [User])
  participants: User[];
}
