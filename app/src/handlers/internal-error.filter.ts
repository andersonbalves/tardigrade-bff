import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

const formatResponse = (
  response: Response,
  status: number,
  path: string,
  message: string | object,
) =>
  response.status(status).json({
    statusCode: status,
    timestamp: new Date().toISOString(),
    path,
    ...(typeof message === 'string' ? { message } : message),
  });

@Catch()
export class InternalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, responseBody } =
      exception instanceof HttpException
        ? {
            status: exception.getStatus(),
            responseBody: exception.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            responseBody: (exception as Error).message,
          };

    formatResponse(response, status, request.url, responseBody);
  }
}
