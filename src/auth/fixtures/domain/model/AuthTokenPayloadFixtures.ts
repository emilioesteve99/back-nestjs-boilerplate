import { UserFixtures } from '../../../../user/fixtures/domain/model/UserFixtures';
import { AuthTokenPayload } from '../../../domain/model/AuthTokenPayload';

export class AuthTokenPayloadFixtures {
  public static get any(): AuthTokenPayload {
    const authTokenPayload: AuthTokenPayload = {
      user: {
        email: UserFixtures.any.email,
        id: UserFixtures.any.id,
      },
    };

    return authTokenPayload;
  }
}
