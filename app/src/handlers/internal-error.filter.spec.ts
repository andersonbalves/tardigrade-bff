/**
 * @jest-environment ./jest.environment.ts
 */
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { InternalErrorFilter } from './internal-error.filter';

describe('InternalErrorFilter', () => {
  let filter: InternalErrorFilter;
  let mockArgumentsHost: ArgumentsHost;
  let mockResponse: Response;
  let mockRequest: Request;

  beforeEach(() => {
    filter = new InternalErrorFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    mockRequest = {
      url: '/test-url',
    } as any;

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
      getRequest: jest.fn().mockReturnValue(mockRequest),
    } as any;
  });

  it('should log the error and send a response with status 500 for generic errors', () => {
    const mockError = new Error('Test error');

    console.error = jest.fn(); // Mock console.error

    filter.catch(mockError, mockArgumentsHost);

    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: expect.any(String),
      path: mockRequest.url,
      message: mockError.message,
    });
  });

  it('should handle HttpException and send the appropriate response', () => {
    const mockHttpException = new HttpException(
      'Form not found',
      HttpStatus.NOT_FOUND,
    );

    filter.catch(mockHttpException, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: expect.any(String),
      path: mockRequest.url,
      message: 'Form not found',
    });
  });

  it('should handle HttpException with an object response', () => {
    const responseObject = { error: 'Custom error message' };
    const mockHttpException = new HttpException(
      responseObject,
      HttpStatus.BAD_REQUEST,
    );

    filter.catch(mockHttpException, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: mockRequest.url,
      ...responseObject,
    });
  });
});
