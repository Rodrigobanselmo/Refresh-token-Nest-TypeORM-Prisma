import { LoginUserDto } from './dto/login-user.dto';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('session')
  session(@Body() loginUserDto: LoginUserDto) {
    return this.authService.session(loginUserDto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() { refresh_token }: { refresh_token: string }) {
    return this.authService.refresh(refresh_token);
  }

  @Delete('refresh')
  deleteAll() {
    return this.authService.deleteAllExpiredRefreshTokens();
  }
}
