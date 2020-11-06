import { ERROR_MESSAGES } from "./ERROR_MESSAGES";
import { HttpStatus } from "@nestjs/common";

export class CheckError {
  constructor(public error: string,
              public status: number = HttpStatus.BAD_REQUEST,
              public message: string = ERROR_MESSAGES.BAD_REQUEST
  ) {}
}

export const check = (any: any, errorMessage: string) => {
  if (any)
    throw new Error(errorMessage)
}