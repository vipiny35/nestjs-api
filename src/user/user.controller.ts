import { Body, Controller, Post } from '@nestjs/common';
import { UserInput } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }

  @Post()
  async createUser(
    @Body() userInput: UserInput
  ) {
    return await this.userService.create(userInput);
  }
}
