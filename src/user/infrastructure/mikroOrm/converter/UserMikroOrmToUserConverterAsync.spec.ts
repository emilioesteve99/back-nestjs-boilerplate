import { UserMikroOrmToUserConverterAsync } from './UserMikroOrmToUserConverterAsync';
import { User } from '../../../domain/model/User';
import { UserFixtures } from '../../../fixtures/domain/model/UserFixtures';
import { UserMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/UserMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserMikroOrmToUserConverterAsync.name, () => {
  let userMikroOrmToUserConverterAsync: UserMikroOrmToUserConverterAsync;

  beforeAll(() => {
    userMikroOrmToUserConverterAsync = new UserMikroOrmToUserConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userMikroOrmFixture: UserMikroOrm;
      let userFixture: User;
      let result: unknown;

      beforeAll(async () => {
        userMikroOrmFixture = UserMikroOrmFixtures.any;
        userFixture = UserFixtures.any;

        result = await userMikroOrmToUserConverterAsync.convert(userMikroOrmFixture);
      });

      it('should return a User', () => {
        expect(result).toStrictEqual(userFixture);
      });
    });
  });
});
