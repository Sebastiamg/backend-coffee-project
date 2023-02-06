import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../dto/register-dto/register-dto';
import { ProfileEntity } from './entities/profile.entity/profile.entity';
import { RegisterEntity } from './entities/register.entity/register.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepositoy: Repository<RegisterEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileUserReposotory: Repository<ProfileEntity>,
  ) {}

  // get all users from db
  async getUsers(): Promise<RegisterEntity[]> {
    return await this.registerRepositoy.find();
  }

  // get one user by email and password) from db
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

  // create one user in db
  async createUser(user: UserRegisterDto) {
    const newUser = this.registerRepositoy.create(user);

    if (user.profile) {
      const newUserProfileData = this.profileUserReposotory.create(
        user.profile,
      );
      newUser.profile = newUserProfileData;
    }

    return await this.registerRepositoy.save(newUser);
  }

  // update one user profile registered in db
  async updateProfile(id: number, userProfileData: UserRegisterDto) {
    const user = await this.registerRepositoy.findOne({ where: { id } });

    try {
      if (user.profile != null) {
        // main data
        user.name = userProfileData.name;
        user.email = userProfileData.email;
        user.password = userProfileData.password;
        user.status = userProfileData.status;

        // profile data
        user.profile.role = userProfileData.profile.role;
        user.profile.phone = userProfileData.profile.phone;
        user.profile.photo = userProfileData.profile.photo;
        user.profile.surname = userProfileData.profile.surname;
        console.log('not null profile');

        return await this.registerRepositoy.save(user);
      }

      const newUserProfileData =
        this.profileUserReposotory.create(userProfileData);
      user.profile = newUserProfileData;
      console.log('null profile');

      return await this.registerRepositoy.save(user);
    } catch (error) {
      console.log(error);
    }
  }

  //Delete one user from db
  async deleteUser(id: number) {
    return await this.registerRepositoy.delete(id);
  }
}
