import { BaseEntitySortKeyAndOrderType } from '../../../common/domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';

export class UserFindQuery implements BaseEntityFindQuery {
  public readonly ids: string[] | undefined = undefined;
  public readonly sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined = undefined;

  public constructor(args: Partial<UserFindQuery>) {
    Object.assign(this, args);
  }
}
