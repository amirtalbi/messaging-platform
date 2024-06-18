import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly rabbitMQService: RabbitMQService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(returns => User)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  async createUser(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = this.userService.create({ email, username, password });
    if(!user) {
      throw new Error('User already exists');
    }
    
    this.rabbitMQService.assertQueue(username);

    return user;
  }
}
