import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import * as jwt from 'jsonwebtoken';
import { AuthPayload } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly authService: AuthService,
  ) {}

  @Mutation((returns) => AuthPayload)
  async user(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<AuthPayload> {
    let user = await this.userService.login({ username, password });
    if (!user) {
      user = await this.userService.create({ username, password });
    }

    this.rabbitMQService.assertQueue(username);

    const token = this.authService.generateToken(user);

    return { user, token };

  }
}
