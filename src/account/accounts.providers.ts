import { AccountEntity } from './account.entity';

export const accountsProviders = [
  {
    provide: 'ACCOUNTS_REPOSITORY',
    useValue: AccountEntity,
  },
];
