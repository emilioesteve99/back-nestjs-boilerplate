import { UserFixtures } from '../../../../../user/fixtures/domain/model/UserFixtures';
import { LogInHttpV1 } from '../../../../infrastructure/http/model/LogInHttpV1';

export class LogInHttpV1Fixtures {
  public static get any(): LogInHttpV1 {
    const logInHttpV1: LogInHttpV1 = new LogInHttpV1();

    logInHttpV1.email = UserFixtures.any.email;
    logInHttpV1.password = UserFixtures.any.password;

    return logInHttpV1;
  }
}
