import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LoginDTO } from '../../account/interfaces/account.dto';
import { AccountEntity } from '../../account/account.entity';
import { LocalStrategy } from './local.strategy';
import { AccountsService } from '../../account/accounts.service';

describe('LocalStrategy', () => {
  let accountService: AccountsService;
  let jwtService: JwtService;
  let localStrategy: LocalStrategy;
  let authService: AuthService;
  const login: LoginDTO = {
    username: 'username',
    email: 'username@email.com',
    password: 'SomerandomPassword888$',
  };

  beforeEach(async () => {
    accountService = new AccountsService(AccountEntity);
    jwtService = new JwtService();
    authService = new AuthService(accountService, jwtService);
    localStrategy = new LocalStrategy(authService);
  });

  describe('validate', () => {
    it('should validate given payload of Account by calling .findAccountById to search in database', async () => {
      jest
        .spyOn(authService, 'validateAccount')
        .mockResolvedValue(login as any);

      const result = await localStrategy.validate(login);

      expect(authService.validateAccount).toHaveBeenCalledWith(login);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(login));
    });

    it('should throw an UnauthorizedException error when there is no account in the database that matched the payload.id', async () => {
      jest.spyOn(authService, 'validateAccount').mockResolvedValue(null);

      try {
        await localStrategy.validate(login);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }

      expect(authService.validateAccount).toHaveBeenCalledWith(login);
    });
  });
});
