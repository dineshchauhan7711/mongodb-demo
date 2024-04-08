import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.BAD_REQUEST;

    const errorMessages = this.buildErrorMessages(exception);

    response.status(statusCode).json({
      statusCode,
      message: errorMessages.length > 0 ? errorMessages[0] : 'Validation failed',
      error: 'Bad Request',
    });
  }

  private buildErrorMessages(exception: ValidationError): string[] {
    const errorMessages: string[] = [];

    for (const property in exception.constraints) {
      if (exception.constraints.hasOwnProperty(property)) {
        errorMessages.push(exception.constraints[property]);
      }
    }

    return errorMessages;
  }
}
