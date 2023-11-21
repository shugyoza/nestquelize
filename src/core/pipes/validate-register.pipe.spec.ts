import { BadRequestException } from '@nestjs/common';

import { ValidateRegisterPipe } from './validate-register.pipe';

describe('ValidateRegisterPipe', () => {
  const validateRegisterPipe = new ValidateRegisterPipe();
  const login = {
    username: 'username',
    email: 'username@email.com',
    password: 'someRandomPassword1?',
  };
  const register = { ...login, role: 'user', confirmPassword: login.password };
  const metadata = true as any;

  describe('isValid', () => {
    it('must must return true if object has all the required properties', () => {
      const result = validateRegisterPipe['isValid'](register);

      expect(result).toBe(true);
    });

    it('must return false if object does not have all the required properties', () => {
      const result = validateRegisterPipe['isValid'](login);

      expect(result).toBe(false);
    });
  });

  it('must validate whether request object has all the expected traits / properties', () => {
    const request = {
      username: 'username',
      email: 'username@email.com',
      role: 'user',
      password: 'someRandomPassword1?',
    };
    const result = validateRegisterPipe['isValid'](request);

    expect(result).toBe(false);
  });

  describe('transform', () => {
    it('must return value if everything is valid', () => {
      const result = validateRegisterPipe.transform(register, metadata);

      expect(JSON.stringify(result)).toEqual(JSON.stringify(register));
    });

    it('should throw BadRequestException when request does not have all the expected properties', () => {
      const value = login;
      try {
        validateRegisterPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when email has invalid format', () => {
      const value = { ...register, email: 'somethingemail.com' };
      try {
        validateRegisterPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username is too short', () => {
      const value = { ...register, username: 'oof' };
      try {
        validateRegisterPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when username has invalid character', () => {
      const value = { ...register, username: 'username&' };
      try {
        validateRegisterPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException when password is too short', () => {
      const value = { ...register, password: 'oof' };
      try {
        validateRegisterPipe.transform(value, metadata);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
