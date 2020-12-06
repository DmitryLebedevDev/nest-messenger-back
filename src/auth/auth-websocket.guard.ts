import { Injectable, CanActivate } from "@nestjs/common";

@Injectable()
export class JwtAuthWebsocketStrategy implements CanActivate {
  canActivate():boolean {
    return false
  }
}