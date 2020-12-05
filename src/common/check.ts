import { ERROR_MESSAGES } from "./ERROR_MESSAGES";
import { HttpStatus, HttpException } from "@nestjs/common";

export class CheckError {
  constructor(public error: string,
              public status: number = HttpStatus.BAD_REQUEST,
              public message: string = ERROR_MESSAGES.BAD_REQUEST
  ) {}
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const check = (any: any,
                      message: string,
                      error = ERROR_MESSAGES.BAD_REQUEST,
                      status = HttpStatus.BAD_REQUEST,
) => {
  if (any)
    throw new HttpException({
      status,
      error,
      message
    }, status)
}