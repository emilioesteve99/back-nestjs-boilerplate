import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthTokenPayloadUser } from '../../../auth/domain/model/AuthTokenPayloadUser';
import { AuthorizedFastifyRequest } from '../../../auth/infrastructure/http/model/AuthorizedFastifyRequest';

export const UserFromRequest: () => ParameterDecorator = createParamDecorator(
  (_data: never, ctx: ExecutionContext): AuthTokenPayloadUser => {
    const request: AuthorizedFastifyRequest = ctx.switchToHttp().getRequest();
    const user: AuthTokenPayloadUser = request.user;
    return user;
  },
);
