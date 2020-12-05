import { Injectable, Logger } from '@nestjs/common';
import { createLogger, transports } from 'winston';

@Injectable()
export class AppLogger extends Logger {
  private logger = createLogger({
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'info.log', level: 'info' })
    ]
  });


  log(message: string):void {
    super.log(message,'Info');
    this.logger.info(message);
  }
}