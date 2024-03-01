import { RequiredEntityData } from '@mikro-orm/core';

import { UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync } from './UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync';
import { UserInsertOneCommand } from '../../../domain/command/UserInsertOneCommand';
import { UserInsertOneCommandFixtures } from '../../../fixtures/domain/command/UserInsertOneCommandFixtures';
import { UserInsertOneQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/UserInsertOneQueryMikroOrmFixtures';
import { UserMikroOrm } from '../model/UserMikroOrm';

describe(UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync.name, () => {
  let userInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsyncTest: UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync;

  beforeAll(() => {
    userInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsyncTest =
      new UserInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let userInsertOneCommandFixture: UserInsertOneCommand;
      let userInsertOneQueryMikroOrmFixture: RequiredEntityData<UserMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        userInsertOneCommandFixture = UserInsertOneCommandFixtures.any;
        userInsertOneQueryMikroOrmFixture = UserInsertOneQueryMikroOrmFixtures.any;

        result = await userInsertOneCommandToUserInsertOneQueryMikroOrmConverterAsyncTest.convert(
          userInsertOneCommandFixture,
        );
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should return a RequiredEntityData<UserMikroOrm>', () => {
        expect(result).toStrictEqual(userInsertOneQueryMikroOrmFixture);
      });
    });
  });
});
