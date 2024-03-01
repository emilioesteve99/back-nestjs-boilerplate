import { ICommand } from '@nestjs/cqrs';

export class ValidatePasswordCommand implements ICommand {
  public readonly passwordToTry!: string;
  public readonly actualPassword!: string;

  public constructor(args: Required<ValidatePasswordCommand>) {
    Object.assign(this, args);
  }
}
