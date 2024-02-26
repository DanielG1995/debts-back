import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UpdateUserInput } from './dto/update-user.input';
import { SignupInput } from 'src/auth/inputs/signup.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(signupInput: SignupInput): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        ...signupInput,
      })
      return await this.usersRepository.save(newUser)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return this.usersRepository.findOneBy({ email });
    } catch (error) {

    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneByOrFail({ id });
    } catch (error) {

    }
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
