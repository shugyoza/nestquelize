import {
  Body,
  Controller,
  Post,
  Delete,
  UseGuards,
  Patch,
  Param,
  NotFoundException,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {
  AccountDTO,
  LoginDTO,
  PartialLoginDTO,
  RegisterDTO,
} from '../../account/interfaces/account.dto';
import { AuthService } from './auth.service';
import { ValidateRegisterPipe } from '../pipes/validate-register.pipe';
import { ValidateLoginPipe } from '../pipes/validate-login.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidateLoginPipe()) // no need to call db if input already invalid
  @UseGuards(AuthGuard('local'))
  async login(@Body() login: LoginDTO): Promise<{
    accessToken: string;
    account: AccountDTO;
  } | null> {
    return await this.authService.login(login);
  }

  @Post('register')
  @UsePipes(new ValidateRegisterPipe())
  async register(@Body() newLogin: RegisterDTO): Promise<{
    account: AccountDTO;
    accessToken: string;
  }> {
    return await this.authService.create(newLogin);
  }

  @Patch('update')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: number,
    @Body() accountUpdate: PartialLoginDTO
  ): Promise<AccountDTO> {
    const { affectedCount, updatedAccount } = await this.authService.update(
      id,
      accountUpdate
    );

    if (!affectedCount) {
      throw new NotFoundException('This account does not exist');
    }

    return updatedAccount;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async delete(id: number): Promise<number> {
    return await this.authService.deleteOne(id);
  }
}
