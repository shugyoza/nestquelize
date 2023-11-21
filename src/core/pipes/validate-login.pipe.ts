import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { LoginDTO } from '../../account/interfaces/account.dto';
import { length, valid, invalid } from '../../shared/constants';

@Injectable()
export class ValidateLoginPipe implements PipeTransform {
  transform(value: unknown, _metadata: ArgumentMetadata) {
    if (!this.isValid(value)) {
      throw new BadRequestException('Invalid Request Body');
    }

    if (value.email && !value.email.match(valid.email)) {
      throw new BadRequestException('invalid email / password');
    }

    if (value.username) {
      if (value.username.length < length.username.min) {
        throw new BadRequestException('invalid username / password');
      }

      if (!value.username.match(valid.username)) {
        throw new BadRequestException('invalid username / password.'); // the dot is not a typo
      }
    }

    if (value.password.match(invalid.password)) {
      throw new BadRequestException('invalid login credentials');
    }

    return value;
  }

  private isValid(value: unknown): value is LoginDTO {
    return (
      !!value &&
      typeof value === 'object' &&
      'password' in value &&
      ('username' in value || 'email' in value)
    );
  }
}
