import { DataSource } from 'typeorm';
import { Member } from '../entity/member.entity';
import { DATA_SOURCE } from 'src/config/constants';
export const MEMBER_REPOSITORY = 'MEBER_REPOSITORY';

export const memberProviders = [
  {
    provide: MEMBER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
    inject: [DATA_SOURCE],
  },
];
