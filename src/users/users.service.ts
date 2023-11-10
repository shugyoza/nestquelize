import { Injectable, Inject } from '@nestjs/common';

import { User } from './user.entity';

/*
Got compile error on the @Injectable decorator, i.e.: 
'Unable to resolve signature of class decorator when called as an expression.
The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.ts(1238)'
Resolved by changing the 'target' in tsconfig.json from '2017' to '2016'.
Ref.: https://stackoverflow.com/questions/36446480/typescript-decorator-reports-unable-to-resolve-signature-of-class-decorator-whe
*/
@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user?.destroy();
  }
}
