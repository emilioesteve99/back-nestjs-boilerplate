import { ICommand } from '@nestjs/cqrs';

export class VerifyTokenCommand implements ICommand {
  public token!: string;

  public constructor(args: Required<VerifyTokenCommand>) {
    Object.assign(this, args);
  }
}
