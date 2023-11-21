import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { LoginDTO } from '../../account/interfaces/account.dto';
import { length, valid, invalid } from '../../shared/constants';
import { ValidateLoginPipe } from './validate-login.pipe';

describe('ValidateLoginPipe', () => {
  const validateLoginPipe = new ValidateLoginPipe();
  const password = 'someRandomPassword1?';
  const usernameLogin = {
    username: 'username',
    password,
  };
  const emailLogin = {
    email: 'username@email.com',
    password,
  };
  const metadata = true as any;

  describe('isValid', () => {
    it('must validate whether request object has username and password', () => {
      const result = validateLoginPipe['isValid'](usernameLogin);

      expect(result).toBe(true);
    });

    it('must validate whether request object has email and password', () => {
      const result = validateLoginPipe['isValid'](emailLogin);

      expect(result).toBe(true);
    });

    it('must throw BadRequestException when there is a missing property', () => {
      try {
        validateLoginPipe['isValid'](emailLogin);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('transform', () => {
    it('must return value if everything is valid', () => {
      const loginWithUsername = validateLoginPipe.transform(
        usernameLogin,
        metadata
      );
      const loginWithEmail = validateLoginPipe.transform(emailLogin, metadata);

      expect(JSON.stringify(loginWithUsername)).toEqual(
        JSON.stringify(usernameLogin)
      );
      expect(JSON.stringify(loginWithEmail)).toEqual(
        JSON.stringify(emailLogin)
      );
    });

    it('should throw BadRequestException when request does not have all the expected properties', () => {
      const value = { password };
      try {
        validateLoginPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when email has invalid format', () => {
      const value = { ...emailLogin, email: 'somethingemail.com' };
      try {
        validateLoginPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username is too short', () => {
      const value = { password, username: 'oof' };
      try {
        validateLoginPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username format is invalid', () => {
      const value = { password, username: 'username&' };
      try {
        validateLoginPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when password is invalid', () => {
      const value = { ...usernameLogin, password: 'oof' };
      try {
        validateLoginPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
