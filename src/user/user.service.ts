import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserInput } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async create(userInput: UserInput): Promise<User> {

    const data = await this.userModel.findOne({ email: userInput.email });

    if (data) { throw new HttpException('Email already exists', 409); }

    return await this.userModel.create({
      ...userInput
    })
  }

}
