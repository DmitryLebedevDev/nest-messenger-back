import { Injectable, Scope, Logger } from '@nestjs/common';
import { createLogger, transports } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class SystemLogger extends Logger {
  private logger = createLogger({
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' })
    ]
  })
  error(error:string, trace:string):void {
    super.error(error,trace);
    this.logger.error(`${error}\n${trace}`);
  }
}