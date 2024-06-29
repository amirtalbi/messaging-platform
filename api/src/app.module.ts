import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { PrismaService } from './prisma.service';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { UserResolver } from './user/user.resolver';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UserModule,
    ConversationModule,
    MessageModule,
    RabbitMQModule,
  ],
  providers: [PrismaService, UserResolver, ChatGateway],
})
export class AppModule {}
