import { UserInsertOneCommand } from '../command/UserInsertOneCommand';

export interface EncryptUserPasswordAdapter {
  encrypt(input: UserInsertOneCommand): Promise<string>;
}
