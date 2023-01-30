import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UserRegisterDto } from '../dto/register-dto/register-dto';
import { AuthService } from './auth.service';

@Controller('auth/register')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post()
  createaUser(@Body() user: UserRegisterDto) {
    return this.authService.createUser(user);
  }
}
