import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('UploadGeoController (e2e)', () => {
  let app: INestApplication;

  async function getToken() {
    let loginToken = '';
    const response = await request(app.getHttpServer())
      .auth('w3b', 'P4ssw0rd')
      .post('/auth/login')
      .send({
        username: 'admin@admin.com',
        password: 'Secret123',
      });

    loginToken = response.body.data.accessToken;
    return loginToken;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const token = await getToken();
    const result = await request(app.getHttpServer())
      .post('/api/v1/geo')
      .attach('file', './file/map.json')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    return expect(result.body.status).toBe(200);
  });
});
