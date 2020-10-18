import { ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from './ERROR_MESSAGES';
import { WsException } from '@nestjs/websockets';

function createErrorObject(errors:ValidationError[], isWsError?:boolean) {
  const objError = {
    status:   HttpStatus.BAD_REQUEST,
    message:  errors.reduce((allErros, errorInfo) => {
                return errorInfo.constraints ?
                  [...allErros,...Object.values(errorInfo.constraints)]
                  :
                  allErros;
    }, []),
    error:   ERROR_MESSAGES.BAD_REQUEST
  }

  if(isWsError) {
    delete objError.status;
    objError.error = 'Bad data'
  }

  return objError;
}

export function createHttpException(erros: ValidationError[], isWsError) {
  throw new HttpException(createErrorObject(erros), HttpStatus.BAD_REQUEST);
}
export function createWsException(erros: ValidationError[]) {
  throw new WsException(createErrorObject(erros, true));
}