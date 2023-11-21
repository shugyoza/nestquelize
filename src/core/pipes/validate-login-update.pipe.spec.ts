import { BadRequestException } from '@nestjs/common';

import { ValidateLoginUpdatePipe } from './validate-login-update.pipe';

describe('ValidateLoginPipe', () => {
  const validateLoginUpdatePipe = new ValidateLoginUpdatePipe();
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
      const result = validateLoginUpdatePipe['isValid'](usernameLogin);

      expect(result).toBe(true);
    });

    it('must validate whether request object has email and password', () => {
      const result = validateLoginUpdatePipe['isValid'](emailLogin);

      expect(result).toBe(true);
    });

    it('must throw BadRequestException when there is a missing property', () => {
      try {
        validateLoginUpdatePipe['isValid'](emailLogin);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('transform', () => {
    it('must return value if everything is valid', () => {
      const loginWithUsername = validateLoginUpdatePipe.transform(
        usernameLogin,
        metadata
      );
      const loginWithEmail = validateLoginUpdatePipe.transform(
        emailLogin,
        metadata
      );

      expect(JSON.stringify(loginWithUsername)).toEqual(
        JSON.stringify(usernameLogin)
      );
      expect(JSON.stringify(loginWithEmail)).toEqual(
        JSON.stringify(emailLogin)
      );
    });

    it('should throw BadRequestException when request does not have all the expected properties', () => {
      const value = {};
      try {
        validateLoginUpdatePipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when email has invalid format', () => {
      const value = { ...emailLogin, email: 'somethingemail.com' };
      try {
        validateLoginUpdatePipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username is too short', () => {
      const value = { password, username: 'oof' };
      try {
        validateLoginUpdatePipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username format is invalid', () => {
      const value = { password, username: 'username&' };
      try {
        validateLoginUpdatePipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when password is invalid', () => {
      const value = { ...usernameLogin, password: 'oof' };
      try {
        validateLoginUpdatePipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
