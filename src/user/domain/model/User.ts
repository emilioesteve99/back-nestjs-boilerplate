import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface User extends BaseEntity {
  email: string;
  name: string;
  password: string;
}
