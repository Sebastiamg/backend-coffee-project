import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/register-dto/register-dto';
import { AuthService } from './auth.service';

@Controller('auth/register')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // get all users from db
  @Get()
  getUsers(@Res() httpResponse) {
    return this.authService
      .getUsers()
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse.status(HttpStatus.FORBIDDEN).json({
          message: 'Error buscando users',
        });
      });
  }

  // get user by email and id with Post
  @Post('get')
  getUser(
    @Body() userItem: { email: string; password: string },
    @Res() httpResponse,
  ) {
    return this.authService
      .getUser(userItem)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse.status(HttpStatus.FORBIDDEN).json({
          message: 'Error buscando users',
        });
      });
  }

  //Create new user
  @Post()
  createaUser(@Body() user: UserRegisterDto) {
    return this.authService.createUser(user);
  }

  // Update User Profile
  @Put(':id/profile')
  updateUserProfile(
    @Param('id') id: number,
    @Body() userProfileData: UserRegisterDto,
    @Res() httpResponse,
  ) {
    return this.authService
      .updateProfile(id, userProfileData)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse.status(HttpStatus.FORBIDDEN).json({
          message: 'Error actualizando perfil',
        });
      });
  }

  // delete user by id from db
  @Delete(':id')
  deleteUser(@Param('id') id: number, @Res() httpResponse) {
    return this.authService
      .deleteUser(id)
      .then((res) => {
        httpResponse.status(HttpStatus.OK).json(res);
      })
      .catch(() => {
        httpResponse
          .status(HttpStatus.FORBIDDEN)
          .json({ message: 'error deleteUser' });
      });
  }
}
