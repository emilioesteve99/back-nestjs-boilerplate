import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface User extends BaseEntity {
  name: string;
}
