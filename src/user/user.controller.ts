import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RouteGuard } from '../guards/route.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User, UserInput, UserResponse } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  // @UseGuards(RouteGuard)
  // @UseInterceptors(new SerializeInterceptor(UserResponse))
  @Serialize(UserResponse)
  getUser(
    @Body() body: UserInput,
  ) {
    console.log('body',body);
    return body;
  }


  @Post()
  async createUser(
    @Body() userInput: UserInput
  ): Promise<User> {
    return await this.userService.create(userInput);
  }
}
