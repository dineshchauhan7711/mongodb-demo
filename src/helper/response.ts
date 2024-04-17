import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { getMessage } from "../lang/message";
import express, { Response } from 'express'

export function successResponse(res: Response, messageCode = null, data = null, statusCode = 200) {
     var response: any = {};
     response.success = true;
     response.message = getMessage(messageCode);
     if (data != null) {
          response.data = data;
     }
     return res.status(statusCode).send(response);
};

export function errorResponse(res: Response, messageCode = 9999, statusCode = 422) {
     var response: any = {};
     response.success = false;
     response.message = getMessage(messageCode);
     statusCode = (messageCode == 9999) ? 500 : statusCode;
     return res.status(statusCode).send(response)
};

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
     public catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp()
          const response = ctx.getResponse() as express.Response
          response
               .status(422)
               .json({
                    success: false,
                    message: exception.response.message[0],
               });
     }
};