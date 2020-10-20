import { ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from './ERROR_MESSAGES';
import { WsException } from '@nestjs/websockets';
import { SocketWithUser } from 'src/socket/socket.interface';

function createErrorObject(errors:ValidationError[], isWsError?:boolean) {
  const objError = {
    status:   HttpStatus.BAD_REQUEST,
    message:  errors.reduce((allErrors, errorInfo) => {
                return errorInfo.constraints ?
                  [...allErrors,...Object.values(errorInfo.constraints)]
                  :
                  allErrors;
    }, []),
    error:   ERROR_MESSAGES.BAD_REQUEST
  }

  if(isWsError) {
    delete objError.status;
    objError.error = 'Bad data'
  }

  return objError;
}

export function checkAndCreateHttpError(errors: ValidationError[]) {
  if (errors.length > 0)
  throw new HttpException(createErrorObject(errors), HttpStatus.BAD_REQUEST);
}
export function checkAndCreateWsError(errors: ValidationError[], socket: SocketWithUser) {
  if (errors.length > 0)
  throw new WsException(createErrorObject(errors, true));
}