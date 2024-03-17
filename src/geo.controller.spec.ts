import { GeoUsecaseModule } from '@core/usecase/geo-usecase.module';
import { Test, TestingModule } from '@nestjs/testing';
import { MulterFile } from '@webundsoehne/nest-fastify-file-upload';
import { JwtAuthGuard } from '@core/common/guards/jwt-auth.guard';
import { UploadGeoController } from '@core/controller/geo/upload-geo.controller';
import { GeoDto } from '@domains/models/dto/geo.dto';
import { UserDto } from '@domains/models/dto/user.dto';
import { UploadGeoUsecase } from '@usecase/geo/upload-geo.usecase';

import * as httpMocks from 'node-mocks-http';

describe('AppController', () => {
  let uploadGeoController: UploadGeoController;

  //Mock User Request
  const mockRequest = httpMocks.createRequest();
  const user = new UserDto();
  user.id = '51';
  mockRequest.user = user;

  //Mock Result
  const geoResult: GeoDto = {
    user_id: user.id,
    file_path: '/uploads/geo/map.json',
  } as GeoDto;

  const mockFile: MulterFile = {
    originalname: 'file.csv',
    mimetype: 'text/csv',
    path: 'something',
    buffer: Buffer.from('one,two,three'),
  } as MulterFile;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [GeoUsecaseModule.register()],
      controllers: [UploadGeoController],
      providers: [UploadGeoUsecase],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    uploadGeoController = app.get<UploadGeoController>(UploadGeoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(uploadGeoController.upload(mockFile, mockRequest)).toBe(geoResult);
    });
  });
});
