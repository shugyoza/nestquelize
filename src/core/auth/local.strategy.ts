import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AccountDTO, LoginDTO } from '../../account/interfaces/account.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(login: LoginDTO): Promise<AccountDTO> {
    const account = await this.authService.validateAccount(login);

    if (!account) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    return account;
  }
}
