import { Socket } from 'socket.io';
import { IjwtUser } from '../user/interface/user.interface';

export interface SocketWithUser extends Socket {
  user: IjwtUser
}