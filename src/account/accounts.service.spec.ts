import { AccountEntity } from './account.entity';
import { AccountsService } from './accounts.service';
import { AccountRole } from '../core/db/models/account.model';
import { AccountDto } from './dto/account.dto';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let account: any;
  let accounts: any[];

  beforeEach(async () => {
    accountsService = new AccountsService(AccountEntity);
    account = {
      id: 1,
      username: 'username1',
      password: 'password1',
      role: AccountRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    accounts = [account];
  });

  describe('findAll', () => {
    it('should return an array of accounts that exist in the database', async () => {
      const promise: Promise<any[]> = new Promise((resolve) => {
        resolve(accounts);
      });

      jest.spyOn(AccountEntity, 'findAll').mockReturnValue(promise);
      const result = await accountsService.findAll();

      expect(AccountEntity.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBe(accounts);
    });
  });

  describe('findOneById', () => {
    it('should return an account if it exists in the database', async () => {
      const account = accounts[0];
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(account);
      });

      jest.spyOn(AccountEntity, 'findOne').mockReturnValue(promise);
      const result = await accountsService.findOneById(account.id);

      expect(AccountEntity.findOne).toHaveBeenCalledWith({
        where: { id: account.id },
      });
      expect(result).toBe(account);
    });
  });

  describe('findOneByUsername', () => {
    it('should return an account if it exists in the database', async () => {
      const [account] = accounts;
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(account);
      });

      jest.spyOn(AccountEntity, 'findOne').mockReturnValue(promise);
      const result = await accountsService.findOneByUsername(account.username);

      expect(AccountEntity.findOne).toHaveBeenCalledWith({
        where: { username: account.username },
      });
      expect(result).toBe(account);
    });
  });

  describe('create', () => {
    it('should create a new account when the request body has all the valid properties', async () => {
      const newAccount = {
        username: 'username2',
        password: 'password2',
        role: AccountRole.USER,
      };

      jest
        .spyOn(AccountEntity, 'create')
        .mockImplementation((input: any): Promise<any> => {
          return new Promise((resolve) => {
            const newDocument = { ...input, id: 2 } as any;
            accounts = [...accounts, newDocument];
            return resolve(accounts);
          });
        });

      await accountsService.create(newAccount as AccountDto);

      expect(AccountEntity.create).toHaveBeenCalledWith(newAccount);
    });
  });

  describe('update', () => {
    it('should update an account when the request body provide a valid id and the updates', async () => {
      const id = account.id;
      const accountUpdate = {
        username: 'username x',
      };
      jest
        .spyOn(AccountEntity, 'update')
        .mockImplementation(
          (): Promise<any> =>
            new Promise((resolve) =>
              resolve([1, [{ ...account, username: accountUpdate.username }]])
            )
        );

      await accountsService.update(account.id, accountUpdate);

      expect(AccountEntity.update).toHaveBeenCalledWith(accountUpdate, {
        where: { id },
        returning: true,
      });
    });
  });

  describe('delete', () => {
    it('should delete an account when the request body provide a valid id', async () => {
      const id = 1;
      jest.spyOn(AccountEntity, 'destroy').mockImplementation((where: any) => {
        return new Promise((resolve) => resolve(where));
      });

      await accountsService.delete(id);

      expect(AccountEntity.destroy).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
