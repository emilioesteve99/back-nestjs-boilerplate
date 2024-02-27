export class ValidatePasswordCommand {
  public readonly passwordToTry!: string;
  public readonly actualPassword!: string;

  public constructor(args: Required<ValidatePasswordCommand>) {
    Object.assign(this, args);
  }
}
