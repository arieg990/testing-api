import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormat } from '@core/common/interceptors/response.interceptor';

export const ApiFailedResponseType = (
  message: string | Array<string>,
  status: number,
  isArray: boolean,
) => {
  return applyDecorators(
    ApiResponse({
      isArray: isArray,
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseFormat) },
          {
            properties: {
              data: {},
              isArray: {
                type: 'boolean',
                default: isArray,
              },
              status: {
                default: status,
              },
              message: {
                default: message,
              },
            },
          },
        ],
      },
    }),
  );
};
