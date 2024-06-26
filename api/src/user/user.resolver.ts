import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { AuthPayload } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './user.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly authService: AuthService,
  ) {}

  @Query((returns) => [UserDto])
  async users(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserDto;
    });
  }

  @Query((returns) => [UserDto])
  async userWithoutConversation(
    @Args('userId') userId: string,
  ): Promise<UserDto[]> {
    const userWithoutConversation =
      await this.userService.findUsersWithoutConversation(userId);
    return userWithoutConversation.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserDto;
    });
  }

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
