import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'owner' | 'admin' | 'user';

  @Column(() => Name)
  name: Name;
}

export class Name {
  @Column()
  first: string;

  @Column()
  middle: string;

  @Column()
  last: string;
}
