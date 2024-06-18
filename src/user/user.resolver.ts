import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    return this.userService.create({ email, username, password });
  }
}
