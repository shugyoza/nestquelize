import { Column, DataType, AllowNull, Length } from 'sequelize-typescript';

import { length } from './constants';

export class Name {
  @AllowNull(false)
  @Length({
    min: length.name.min,
    max: length.name.max,
  })
  @Column(DataType.STRING)
  first: string;

  @AllowNull(true)
  @Length({ max: length.name.max })
  @Column(DataType.STRING)
  middle: string;

  @AllowNull(false)
  @Length({
    min: length.name.min,
    max: length.name.max,
  })
  @Column(DataType.STRING)
  last: string;

  @AllowNull(true)
  @Length({ max: length.suffix })
  @Column(DataType.STRING)
  suffix: string;
}
