import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class JwtAuthWebsocketStrategy implements CanActivate {
  canActivate() {
    console.log('no');
    return false
  }
}