import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { RegisterDTO } from '../../account/interfaces/account.dto';
import { length, valid, invalid } from '../../shared/constants';

@Injectable()
export class ValidateRegisterPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata) {
    const errors: string[] = [];

    if (!this.isValid(value)) {
      throw new BadRequestException('Invalid Request Body');
    }

    if (!value.email.match(valid.email)) {
      errors.push('email is invalid');
    }

    if (value.username.length < length.username.min) {
      errors.push(
        `username must have at least ${length.username.min} characters`
      );
    }

    if (!value.username.match(valid.username)) {
      errors.push(
        'username cannot have any characters other than lowercased letter, number, a dash: - , or underscore: _'
      );
    }

    if (value.password.match(invalid.password)) {
      errors.push(
        'password must have at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character'
      );
    }

    if (value.password !== value.confirmPassword) {
      errors.push('password and confirmation do not match');
    }

    if (errors.length) {
      throw new BadRequestException(errors.join('; '));
    }

    return value;
  }

  private isValid(value: unknown): value is RegisterDTO {
    return (
      !!value &&
      typeof value === 'object' &&
      'username' in value &&
      'email' in value &&
      'role' in value &&
      'password' in value &&
      'confirmPassword' in value
    );
  }
}
