import { BadRequestException, Catch } from '@nestjs/common';
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch(BadRequestException)
export class BadRequestTransformationFilter extends BaseWsExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: BadRequestException, host:any):void {
    const errorInfo: any = exception.getResponse();
    errorInfo.error = 'Bad data';
    delete errorInfo.statusCode;

    if (host.args[1] && host.args[1].emited) {
      errorInfo.emited = host.args[1].emited;
    }

    const properError = new WsException(errorInfo);
    super.catch(properError, host);
  }
}