import {
  Controller,
  FileTypeValidator,
  Inject,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { Request } from 'express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '@core/common/guards/jwt-auth.guard';
import { FastifyFileInterceptor } from '@core/common/interceptors/fastify-file-interceptor';
import {
  ResponseMessage,
  ResponseMessageDecorator,
} from '@core/common/interceptors/response.decorator';
import { ApiFailedResponseType } from '@core/common/swagger/failed-response.decorator';
import { ApiResponseType } from '@core/common/swagger/response.decorator';
import { GeoJsonFileValidator } from '@core/common/validator/geo-json.vaidator';
import { GeoUsecaseModule } from '@core/usecase/geo-usecase.module';
import { Usecase } from '@core/usecase/usecase';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { UserDto } from '@domains/models/dto/user.dto';
import { UploadGeoRequest } from '@domains/models/request/geo/upload-geo.request';
import { IUsecase } from '@domains/usecase/usecase.interface';

@Controller()
@ApiTags('Geo')
@ApiFailedResponseType(['name cannot be null'], 400, true)
@ApiFailedResponseType('No authorization token was found', 401, false)
@ApiFailedResponseType('Internal server error', 500, false)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(GeoDto)
export class UploadGeoController {
  constructor(
    @Inject(GeoUsecaseModule.UPLOAD_GEO_USECASES)
    private readonly usecase: Usecase<IUsecase<UploadGeoRequest, GeoDto>>,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FastifyFileInterceptor('file', {
      storage: memoryStorage(),
    }),
  )
  @ApiResponseType(GeoDto, false)
  @ApiBody({ type: UploadGeoRequest })
  @ResponseMessage(ResponseMessageDecorator.RESULT_CREATED)
  @ApiOperation({ description: 'Upload Geo Data File' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'application/json' }),
          new GeoJsonFileValidator({}),
        ],
      }),
    )
    file: MulterFile,
    @Req() request: Request,
  ): Promise<GeoDto> {
    const payload = new UploadGeoRequest();
    console.log(file);
    payload.file = file;
    payload.user_id = (request.user as UserDto).id;
    return this.usecase.getInstance().execute(payload);
  }
}
