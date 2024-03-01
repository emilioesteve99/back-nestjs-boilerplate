import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthTokenPayloadUser } from '../../../auth/domain/model/AuthTokenPayloadUser';
import { AuthorizedFastifyRequest } from '../../../auth/infrastructure/http/model/AuthorizedFastifyRequest';

export const UserPropertyFromRequest: (key: keyof AuthTokenPayloadUser) => ParameterDecorator = createParamDecorator(
  (key: keyof AuthTokenPayloadUser, ctx: ExecutionContext): AuthTokenPayloadUser[keyof AuthTokenPayloadUser] => {
    const request: AuthorizedFastifyRequest = ctx.switchToHttp().getRequest();
    const user: AuthTokenPayloadUser = request.user;
    return user[key];
  },
);
