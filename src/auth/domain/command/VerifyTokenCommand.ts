export class VerifyTokenCommand {
  public token!: string;

  public constructor(args: Required<VerifyTokenCommand>) {
    Object.assign(this, args);
  }
}
