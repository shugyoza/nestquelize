import { JwtService } from '@nestjs/jwt';
import * as _bcrypt from 'bcrypt';

import { AccountEntity } from '../../account/account.entity';
import { AccountsService } from '../../account/accounts.service';
import { AccountDTO } from '../../account/interfaces/account.dto';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let accountsService: AccountsService;
  let bcrypt: any;

  beforeEach(async () => {
    accountsService = new AccountsService(AccountEntity);
    jwtService = new JwtService();
    authService = new AuthService(accountsService, jwtService);
    bcrypt = _bcrypt;
  });

  describe('create', () => {
    it('should create an account with the given valid inputs', async () => {
      const input = {
        username: 'newUser',
        email: 'newuser@email.com',
        password: 'Newuser1!',
      };
      const created = {
        id: 2,
        ...input,
      };
      const mock = {
        input: {
          ...input,
          confirmPassword: 'Newuser1!',
        },
        dataValues: created,
        accessToken: 'hashedPassword#$',
      };
      const promise = {
        accountsService: new Promise((resolve) => {
          resolve(mock);
        }),
        jwtService: new Promise<string>((resolve) =>
          resolve(mock.accessToken as string)
        ),
      };

      jest.spyOn(jwtService, 'signAsync').mockReturnValue(promise.jwtService);
      jest
        .spyOn(accountsService, 'create')
        .mockReturnValue(promise.accountsService as any);
      const result = await authService.create(mock.input);

      expect(result.account.username).toEqual(input.username);
      expect(result.account.email).toEqual(input.email);
      expect(result.accessToken).toEqual(mock.accessToken);
    });
  });

  describe('validateAccount', () => {
    it('should return the corresponding account in database given the valid username and password', async () => {
      const login = {
        username: 'blabla123',
        password: 'Passwordbla111!',
      };
      const response = {
        ...login,
        id: 3,
        email: 'blabla123@email.com',
        role: 'user',
      };

      jest
        .spyOn(accountsService, 'findOneByUsername')
        .mockResolvedValue(response as any);
      // mocking private method with 'as any'
      jest.spyOn(authService as any, 'comparePassword').mockResolvedValue(true);

      const result = await authService.validateAccount(login);

      expect(result?.id).toBeTruthy();
      expect(result?.email).toEqual(response.email);
      expect(result?.username).toEqual(response.username);
    });

    it('should return the corresponding account in database given the valid email and password', async () => {
      const login = {
        email: 'blabla123@email.com',
        password: 'Passwordbla111!',
      };
      const response = {
        ...login,
        id: 3,
        username: 'blabla123',
        role: 'user',
      };

      jest
        .spyOn(accountsService, 'findOneByEmail')
        .mockResolvedValue(response as any);

      jest.spyOn(authService as any, 'comparePassword').mockResolvedValue(true);

      const result = await authService.validateAccount(login);

      expect(result?.id).toBeTruthy();
      expect(result?.email).toEqual(response.email);
      expect(result?.username).toEqual(response.username);
    });

    it('should return null if there is no password given', async () => {
      const login = {
        username: 'blabla123',
      };

      const result = await authService.validateAccount(login);

      expect(result).toBe(null);
    });

    it('should return null when no account has been found', async () => {
      const login = {
        email: 'blabla123@email.com',
        password: 'Passwordbla111!',
      };

      jest.spyOn(accountsService, 'findOneByEmail').mockResolvedValue(null);
      const result = await authService.validateAccount(login);

      expect(result).toBe(null);
    });

    it('should return null when hashed password from account does not match hashed password from input', async () => {
      const login = {
        email: 'blabla123@email.com',
        password: 'Passwordbla111!',
      };
      const response = {
        ...login,
        id: 3,
        username: 'blabla123',
        role: 'user',
      };

      jest
        .spyOn(accountsService, 'findOneByEmail')
        .mockResolvedValue(response as any);
      jest
        .spyOn(authService as any, 'comparePassword')
        .mockResolvedValue(false);

      const result = await authService.validateAccount(login);

      expect(result).toBe(null);
    });
  });

  describe('login', () => {
    it('should call .validateAccount and .generateToken', async () => {
      const login = {
        username: 'blabla123',
        password: 'Passwordbla111!',
      };
      const account = {
        ...login,
        id: 4,
        email: 'blabla123@email.com',
        role: 'user',
      };
      const generatedToken = 'somerandomgeneratedtoken';

      jest
        .spyOn(authService, 'validateAccount')
        .mockResolvedValue(account as AccountDTO);
      jest
        .spyOn(authService as any, 'generateToken')
        .mockResolvedValue(generatedToken);

      await authService.login(login as any);

      expect(authService.validateAccount).toHaveBeenCalledWith(login);
      expect(authService['generateToken']).toHaveBeenCalledWith(account);
    });

    it('should return null when .validateAccount returns null', async () => {
      const login = {
        email: 'blabla123@email.com',
        password: 'Passwordbla111!',
      };

      jest.spyOn(authService, 'validateAccount').mockResolvedValue(null);

      const result = await authService.login(login as any);

      expect(authService.validateAccount).toHaveBeenLastCalledWith(login);
      expect(result).toBe(null);
    });
  });

  describe('update', () => {
    it('should call accountService.update', async () => {
      const login = {
        username: 'blabla123',
        password: 'Passwordbla111!',
      };
      const account = {
        ...login,
        id: 4,
        email: 'blabla123@email.com',
        role: 'user',
      };
      const update = {
        username: 'bleble321',
      };
      const mock = {
        result: {
          affectedCount: 1,
          updatedAccount: account,
        },
      };

      jest
        .spyOn(accountsService, 'update')
        .mockResolvedValue(mock.result as any);

      const result = await authService.update(account.id, update);

      expect(accountsService.update).toHaveBeenCalledWith(account.id, update);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(mock.result));
    });
  });

  describe('deleteOne', () => {
    it('should call accountService.deleteOne', async () => {
      const id = 5;
      jest.spyOn(accountsService, 'deleteOne').mockResolvedValue(id);

      const result = await authService.deleteOne(id);

      expect(accountsService.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(id);
    });
  });

  describe('comparePassword', () => {
    it('should call bcrypt hash method', async () => {
      const password = 'somerandompassword';
      const hashedPassword = 'somerandomhashvalue';
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await authService['comparePassword'](
        password,
        hashedPassword
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe('hashPassword', () => {
    it('should call bcrypt hash method', async () => {
      const password = 'somerandompassword';
      const defaultSalt = 10;
      const hashValue = 'somerandomhashvalue';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashValue);

      const result = await authService['hashPassword'](password, defaultSalt);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, defaultSalt);
      expect(result).toBe(hashValue);
    });
  });
});
