import { Socket } from 'socket.io';
import { IjwtUser } from '../user/interface/user.interface';

export interface SocketWithUser extends Socket {
  user: IjwtUser
}

interface Iconnect {
  to: string
  from: string
  desc: RTCSessionDescription
}
interface IconnectIces {
  to: string,
  from: string,
  ices: RTCIceCandidateInit[]
}