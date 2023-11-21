import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AccountsService } from '../../account/accounts.service';
import {
  AccountDTO,
  LoginDTO,
  PartialLoginDTO,
  RegisterDTO,
} from '../../account/interfaces/account.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  async validateAccount(login: PartialLoginDTO): Promise<AccountDTO | null> {
    let account;

    if (!login.password) {
      return null;
    }

    if (login.username) {
      account = await this.accountsService.findOneByUsername(login.username);
    } else if (login.email) {
      account = await this.accountsService.findOneByEmail(login.email);
    }

    if (!account) {
      return null;
    }

    const passwordMatched = await this.comparePassword(
      login.password,
      account.password
    );

    if (!passwordMatched) {
      return null;
    }

    const { id, email, username, role } = account;
    return { id, email, username, role };
  }

  public async login(loginAccount: LoginDTO): Promise<{
    accessToken: string;
    account: AccountDTO;
  } | null> {
    const account = await this.validateAccount(loginAccount);

    if (!account) {
      return null;
    }

    const accessToken = await this.generateToken(account);

    return {
      accessToken,
      account,
    };
  }

  public async create(
    registerAccount: RegisterDTO
  ): Promise<{ account: AccountDTO; accessToken: string }> {
    const hashedPassword = await this.hashPassword(registerAccount.password);
    const response = await this.accountsService.create({
      ...registerAccount,
      password: hashedPassword,
    });

    const { id, email, username, role } = response.dataValues;
    const account = { id, email, username, role };
    const accessToken = await this.generateToken(account);

    return { account, accessToken };
  }

  public async update(
    id: number,
    updates: PartialLoginDTO
  ): Promise<{ affectedCount: number; updatedAccount: AccountDTO }> {
    return await this.accountsService.update(id, updates);
  }

  public async deleteOne(id: number): Promise<number> {
    return await this.accountsService.deleteOne(id);
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string, salt = 10): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  private async generateToken(account: AccountDTO): Promise<string> {
    return this.jwtService.signAsync(account);
  }
}
