import { ProfileDto } from '../profile-dto/profile-dto';

export class UserRegisterDto {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  profile?: ProfileDto;
}
