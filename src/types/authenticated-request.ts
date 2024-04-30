import { Request } from 'express';
import { User } from 'src/users/user.entity';

export type AuthenticatedRequest = Request & {
  user: User;
};
