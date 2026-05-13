import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>
  ) { }

  async register(data: any) {

    const user = this.userRepository.create(data);

    return this.userRepository.save(user);

  }

  async login(data: any) {

    const user = await this.userRepository.findOne({
      where: { email: data.email }
    });

    if (!user) {
      return { message: "User not found" };
    }

    if (user.password !== data.password) {
      return { message: "Password incorrect" };
    }

    return {
      message: "Login success",
      user
    };
  }

}