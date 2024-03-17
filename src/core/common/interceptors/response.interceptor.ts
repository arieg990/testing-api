import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiProperty } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { ResponseMessageKey } from '@core/common/interceptors/response.decorator';

export class ResponseFormat<T> {
  @ApiProperty()
  isArray: boolean;
  @ApiProperty()
  duration: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';

    response.status(HttpStatus.OK);

    return next.handle().pipe(
      map((data) => ({
        data,
        isArray: Array.isArray(data),
        duration: `${Date.now() - now}ms`,
        message: responseMessage,
        status: context.switchToHttp().getResponse().statusCode,
      })),
    );
  }
}
