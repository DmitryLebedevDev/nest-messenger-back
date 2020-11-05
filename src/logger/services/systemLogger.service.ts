import { Injectable, Scope, Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class SystemLogger extends Logger {
  private logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' })
    ]
  })
  //log(message) {
  //  this.logger.('info', message);
  //}
}