import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import * as jwt from 'jsonwebtoken';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Query((returns) => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation((returns) => User)
  async user(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    let user = await this.userService.login({ username, password });
    if (!user) {
      user = await this.userService.create({ username, password });
    }

    this.rabbitMQService.assertQueue(username);

    const token = jwt.sign(
      { username: user.username, sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return {
      ...user,
      token,
    };
  }
}
