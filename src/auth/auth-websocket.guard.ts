import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class JwtAuthWebsocketStrategy implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    console.log(client.handshake);
    return false;
  }
}