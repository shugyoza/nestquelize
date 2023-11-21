import { JwtService } from '@nestjs/jwt';

import { AccountEntity } from '../../account/account.entity';
import { AccountsService } from '../../account/accounts.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccountDTO, LoginDTO } from '../../account/interfaces/account.dto';
import { AccountRole } from '../db/models/account.model';
import { NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let jwtService: JwtService;
  let accountsService: AccountsService;
  let authController: AuthController;
  let authService: AuthService;
  const login: LoginDTO = {
    username: 'username',
    email: 'username@email.com',
    password: 'SomerandomPassword888$',
  };
  const account: AccountDTO = {
    ...login,
    id: 9,
    role: 'user' as AccountRole,
  };
  const accessToken = 'somerandomaccesstoken$#@';

  beforeEach(async () => {
    jwtService = new JwtService();
    accountsService = new AccountsService(AccountEntity);
    authService = new AuthService(accountsService, jwtService);
    authController = new AuthController(authService);
  });

  describe('login', () => {
    it('should call for .authService.login on user login and return the account and access token on success', async () => {
      const mock = {
        account,
        accessToken,
      };
      jest.spyOn(authService, 'login').mockResolvedValue(mock);

      const result = await authController.login(login);

      expect(authService.login).toHaveBeenCalledWith(login);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(mock));
    });

    // bad password has already been handled by the validation login pipe
    it('should return null authService.login returns null for whatever reason', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(null);

      const result = await authController.login(login);

      expect(result).toEqual(null);
    });
  });

  describe('register', () => {
    it('should call for .authService.create on user login and return a newly created account and access token on success', async () => {
      const register = { ...login, confirmPassword: login.password };
      const mock = {
        account,
        accessToken,
      };
      jest.spyOn(authService, 'create').mockResolvedValue(mock);

      const result = await authController.register(register);

      expect(authService.create).toHaveBeenCalledWith(register);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(mock));
    });
  });

  describe('update', () => {
    it('should call for .authService.create on user login and return a newly created account and access token on success', async () => {
      const update = { username: 'somerandomusername' };
      const mock = {
        affectedCount: 1,
        updatedAccount: account,
      };
      jest.spyOn(authService, 'update').mockResolvedValue(mock as any);

      const result = await authController.update(account.id, update);

      expect(authService.update).toHaveBeenCalledWith(account.id, update);
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(mock.updatedAccount)
      );
    });

    it('should throw NotFoundException when there is no account being updated', async () => {
      const update = { username: 'somerandomusername' };
      const mock = {
        affectedCount: 0,
        updatedAccount: [],
      };
      jest.spyOn(authService, 'update').mockResolvedValue(mock as any);

      try {
        await authController.update(account.id, update);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should call for .authService.deleteOne', async () => {
      const id = 4;
      jest.spyOn(authService, 'deleteOne').mockResolvedValue(id);

      const result = await authController.delete(id);

      expect(authService.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(id);
    });
  });
});
