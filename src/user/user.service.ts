import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserInput } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel
  ) { }

  async create(userInput: UserInput): Promise<User> {
    const user = await this.userModel.create({
      ...userInput
    })
    return user;
  }

}
