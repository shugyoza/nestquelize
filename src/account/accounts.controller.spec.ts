import { AccountEntity } from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AccountRole } from '../core/db/models/account.model';
import { AccountDto } from './dto/account.dto';
import { NotFoundException } from '@nestjs/common';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;
  const account = {
    id: 1,
    username: 'username1',
    password: 'password1',
    role: AccountRole.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as any;
  let accounts = [account];

  beforeEach(async () => {
    accountsService = new AccountsService(AccountEntity);
    accountsController = new AccountsController(accountsService);
  });

  describe('findAll', () => {
    it('should return an array of accounts that exist in the database', async () => {
      const promise: Promise<any[]> = new Promise((resolve) => {
        resolve(accounts);
      });
      jest.spyOn(accountsService, 'findAll').mockReturnValue(promise);

      const result = await accountsController.findAll();

      expect(accountsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toBe(accounts);
    });
  });

  describe('findOneById', () => {
    it('should return an account if it exists in the database', async () => {
      const account = accounts[0];
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(account);
      });
      jest.spyOn(accountsService, 'findOneById').mockReturnValue(promise);

      const result = await accountsController.findOneById(account.id);

      expect(accountsService.findOneById).toHaveBeenCalledWith(account.id);
      expect(result).toBe(account);
    });

    it('should throw NotFoundException when there is no account with the given id', async () => {
      const id = 8888;
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(null);
      });

      jest.spyOn(accountsService, 'findOneById').mockReturnValue(promise);

      try {
        await accountsController.findOneById(id);
      } catch (err) {
        expect(accountsService.findOneById).toHaveBeenCalledWith(id);
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findOneByUsername', () => {
    it('should return an account if it exists in the database', async () => {
      const [account] = accounts;
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(account);
      });
      jest.spyOn(accountsService, 'findOneByUsername').mockReturnValue(promise);
      const result = await accountsController.findOneByUsername(
        account.username
      );

      expect(accountsService.findOneByUsername).toHaveBeenCalledWith(
        account.username
      );
      expect(result).toBe(account);
    });

    it('should throw NotFoundException when there is no account with the given username', async () => {
      const username = 'somethingWild';
      const promise: Promise<any> = new Promise((resolve) => {
        resolve(null);
      });

      jest.spyOn(accountsService, 'findOneByUsername').mockReturnValue(promise);

      try {
        await accountsController.findOneByUsername(username);
      } catch (err) {
        expect(accountsService.findOneByUsername).toHaveBeenCalledWith(
          username
        );
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('addOne', () => {
    it('should create a new account when the request body has all the valid properties', async () => {
      const newAccount = {
        username: 'username2',
        password: 'password2',
        role: AccountRole.USER,
      };

      jest
        .spyOn(accountsService, 'create')
        .mockImplementation((input: AccountDto): Promise<any> => {
          return new Promise((resolve) => {
            const newDocument = { ...input, id: 2 } as any;
            accounts = [...accounts, newDocument];
            return resolve(accounts);
          });
        });

      await accountsController.addOne(newAccount as AccountDto);

      expect(accountsService.create).toHaveBeenCalledWith(newAccount);
    });
  });

  describe('update', () => {
    it('should update an account when the request body provide a valid id and the updates', async () => {
      const id = account.id;
      const accountUpdate = {
        ...account,
        username: 'username x',
      };
      jest.spyOn(accountsService, 'update').mockImplementation(
        (): Promise<any> =>
          new Promise((resolve) =>
            resolve({
              affectedCount: 1,
              updatedAccount: {
                ...account,
                username: accountUpdate.username,
              },
            })
          )
      );

      await accountsController.update(account.id, accountUpdate);

      expect(accountsService.update).toHaveBeenCalledWith(id, accountUpdate);
    });

    it('should throw NotFoundException when there is no account getting updated', async () => {
      const id = 8888;
      const promise: Promise<any> = new Promise((resolve) => {
        resolve({ affectedCount: 0, updatedAccount: [] });
      });

      jest.spyOn(accountsService, 'update').mockReturnValue(promise);

      try {
        await accountsController.update(id, {} as any);
      } catch (err) {
        expect(accountsService.update).toHaveBeenCalledWith(id, {});
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete an account when the request body provide a valid id', async () => {
      const id = 1;
      jest.spyOn(accountsService, 'delete').mockImplementation((id: number) => {
        return new Promise((resolve) => resolve(id));
      });

      await accountsController.delete(id);

      expect(accountsService.delete).toHaveBeenCalledWith(id);
    });
  });

  it('should throw NotFoundException when there is no account getting deleted', async () => {
    const id = 8888;
    const promise: Promise<any> = new Promise((resolve) => {
      resolve(0);
    });

    jest.spyOn(accountsService, 'delete').mockReturnValue(promise);

    try {
      await accountsController.delete(id);
    } catch (err) {
      expect(accountsService.delete).toHaveBeenCalledWith(id);
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
