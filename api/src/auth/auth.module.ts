import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service'; // Import UserService
import { PrismaService } from '../prisma.service'; // Import PrismaService
import { MessageModule } from 'src/message/message.module';
import { MessageProducer } from 'src/message/message.producer';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { MessageConsumer } from 'src/message/message.consumer';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    MessageModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange',
          type: 'topic',
        },
      ],
      uri: process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    MessageProducer,
    MessageConsumer,
    MessageService,
    PrismaService,
  ],
  exports: [AuthService]
})
export class AuthModule {}
