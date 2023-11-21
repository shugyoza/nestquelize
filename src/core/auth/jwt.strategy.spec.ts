import { UnauthorizedException } from '@nestjs/common';

import { AccountsService } from '../../account/accounts.service';
import { AccountDTO } from '../../account/interfaces/account.dto';
import { AccountEntity } from '../../account/account.entity';
import { AccountRole } from '../db/models/account.model';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let accountsService: AccountsService;
  const payload: AccountDTO = {
    id: 8,
    username: 'username',
    email: 'username@email.com',
    role: 'user' as AccountRole,
  };

  beforeEach(async () => {
    accountsService = new AccountsService(AccountEntity);
    jwtStrategy = new JwtStrategy(accountsService);
  });

  describe('validate', () => {
    it('should validate given payload of Account by calling .findAccountById to search in database', async () => {
      jest
        .spyOn(accountsService, 'findOneById')
        .mockResolvedValue(payload as AccountEntity);

      const result = await jwtStrategy.validate(payload);

      expect(accountsService.findOneById).toHaveBeenCalledWith(payload.id);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(payload));
    });

    it('should throw an UnauthorizedException error when there is no account in the database that matched the payload.id', async () => {
      jest.spyOn(accountsService, 'findOneById').mockResolvedValue(null);

      try {
        await jwtStrategy.validate(payload);
      } catch (err) {
        expect(err).toBeInstanceOf(UnauthorizedException);
      }

      expect(accountsService.findOneById).toHaveBeenCalledWith(payload.id);
    });
  });
});
