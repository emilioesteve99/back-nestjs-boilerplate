import { expect, Mocked } from 'vitest';

import { InsertOneUserManager } from './InsertOneUserManager';
import { InsertOneAdapter } from '../../../common/domain/adapter/InsertOneAdapter';
import { UserInsertOneCommandFixtures } from '../../fixtures/domain/command/UserInsertOneCommandFixtures';
import { UserFixtures } from '../../fixtures/domain/model/UserFixtures';
import { EncryptUserPasswordAdapter } from '../adapter/EncryptUserPasswordAdapter';
import { UserInsertOneCommand } from '../command/UserInsertOneCommand';
import { User } from '../model/User';

describe(InsertOneUserManager.name, () => {
  let insertOneUserMikroOrmAdapterMock: Mocked<InsertOneAdapter<UserInsertOneCommand, User>>;
  let encryptUserPasswordAdapterMock: Mocked<EncryptUserPasswordAdapter>;

  let insertOneUserManager: InsertOneUserManager;

  beforeAll(() => {
    insertOneUserMikroOrmAdapterMock = {
      insertOne: vi.fn(),
    };
    encryptUserPasswordAdapterMock = {
      encrypt: vi.fn(),
    };

    insertOneUserManager = new InsertOneUserManager(insertOneUserMikroOrmAdapterMock, encryptUserPasswordAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let userInsertOneCommandFixture: UserInsertOneCommand;
      let encryptedPasswordFixture: string;
      let userFixture: User;
      let result: unknown;

      beforeAll(async () => {
        userInsertOneCommandFixture = UserInsertOneCommandFixtures.any;
        encryptedPasswordFixture = 'encrypted-password-example';
        userFixture = UserFixtures.any;

        encryptUserPasswordAdapterMock.encrypt.mockResolvedValue(encryptedPasswordFixture);
        insertOneUserMikroOrmAdapterMock.insertOne.mockResolvedValue(userFixture);

        result = await insertOneUserManager.manage(userInsertOneCommandFixture);
      });

      afterAll(() => {
        vi.clearAllMocks();
      });

      it('should call encryptUserPasswordAdapter.encrypt()', () => {
        expect(encryptUserPasswordAdapterMock.encrypt).toHaveBeenCalledOnce();
        expect(encryptUserPasswordAdapterMock.encrypt).toHaveBeenCalledWith(userInsertOneCommandFixture);
      });

      it('should call insertOneUserMikroOrmAdapter.insertOne()', () => {
        expect(insertOneUserMikroOrmAdapterMock.insertOne).toHaveBeenCalledOnce();
        expect(insertOneUserMikroOrmAdapterMock.insertOne).toHaveBeenCalledWith(
          new UserInsertOneCommand({
            email: userInsertOneCommandFixture.email,
            name: userInsertOneCommandFixture.name,
            password: encryptedPasswordFixture,
          }),
        );
      });

      it('should return a User', () => {
        expect(result).toStrictEqual(userFixture);
      });
    });
  });
});
