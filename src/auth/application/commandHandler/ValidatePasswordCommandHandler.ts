import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { ValidatePasswordCommand } from '../../domain/command/ValidatePasswordCommand';
import { ValidatePasswordManager } from '../../domain/manager/ValidatePasswordManager';

@CommandHandler(ValidatePasswordCommand)
export class ValidatePasswordCommandHandler implements ICommandHandler<ValidatePasswordCommand> {
  public constructor(
    @Inject(ValidatePasswordManager)
    private readonly validatePasswordManager: ManagerAsync<ValidatePasswordCommand, boolean>,
  ) {}

  public async execute(command: ValidatePasswordCommand): Promise<boolean> {
    const result: boolean = await this.validatePasswordManager.manage(command);

    return result;
  }
}
