import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AccountsService } from '../../account/accounts.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountsService: AccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // grabs bearer token from request auth header
      ignoreExpiration: false, // check if token has expired
      secretOrKey: process.env.JWT_KEY, // secret key use in combination with public key for validation
    });
  }

  async validate(payload: any) {
    const account = await this.accountsService.findOneById(payload.id);

    if (!account) {
      throw new UnauthorizedException(
        'You are not authorized to perform this operation'
      );
    }

    return payload;
  }
}
