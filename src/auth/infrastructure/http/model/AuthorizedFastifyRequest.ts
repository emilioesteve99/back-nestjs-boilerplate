import { FastifyRequest } from 'fastify';

export interface AuthorizedFastifyRequest extends FastifyRequest {
  user: {
    email: string;
    id: string;
  };
}
