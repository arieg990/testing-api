import { SetMetadata } from '@nestjs/common';

export const ResponseMessageKey = 'ResponseMessageKey';
export const ResponseMessage = (message: string) =>
  SetMetadata(ResponseMessageKey, message);

export class ResponseMessageDecorator {
  static RESULT_CREATED = 'Data created';
  static RESULT_OK = 'Result ok';
  static RESULT_UPDATED = 'Data updated';
  static RESULT_DELETED = 'Data deleted';
  static RESULT_LOGIN_SUCCESS = 'Login success';
  static RESULT_REGISTER_SUCCESS = 'Register success';
}
