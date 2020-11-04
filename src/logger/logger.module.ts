import { Module } from '@nestjs/common';
import { SystemLogger } from './services/systemLogger.service';
import { AppLogger } from './services/appLogger.service'

@Module({
  providers: [SystemLogger, AppLogger ],
  exports: [SystemLogger, AppLogger],
})
export class LoggerModule {}