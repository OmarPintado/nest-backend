import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(
    @Req() request: Express.Request,
    @GetUser('email') user: User,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      ok: 'true',
      message: 'Acceso correcto!',
      user,
      rawHeaders,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: 'true',
      message: 'Acceso correcto!',
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.superUser)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: 'true',
      message: 'Acceso correcto!',
      user,
    };
  }
}
