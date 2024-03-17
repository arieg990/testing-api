import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseFormat } from '@core/common/interceptors/response.interceptor';

export const ApiResponseType = <TModel extends Type>(
  model: TModel,
  isArray: boolean,
) => {
  return applyDecorators(
    ApiOkResponse({
      isArray: isArray,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseFormat) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
              isArray: {
                type: 'boolean',
                default: isArray,
              },
              status: {
                default: 200,
              },
            },
          },
        ],
      },
    }),
  );
};
