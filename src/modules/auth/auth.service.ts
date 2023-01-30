import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/register-dto/register-dto';
import { RegisterEntity } from './entities/register.entity/register.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepositoy: Repository<RegisterEntity>,
  ) {}

  async getUsers(): Promise<RegisterEntity[]> {
    return await this.registerRepositoy.find();
  }

  async getUser(user: {
    email: string;
    password: string;
  }): Promise<RegisterEntity> {
    return await this.registerRepositoy.findOne({
      where: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async createUser(user: UserRegisterDto) {
    const newUser = this.registerRepositoy.create(user);
    return await this.registerRepositoy.save(newUser);
  }
}
