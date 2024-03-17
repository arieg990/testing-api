import { AllExceptionFilter } from '@core/common/filter/exception.filter';
import { LoggerInterceptor } from '@core/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@core/common/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@core/logger/logger.service';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import { contentParser } from 'fastify-multer';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();

  await app.register(contentParser);

  // Helment
  await app.register(helmet);

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .addBasicAuth()
      .setTitle('Base Api Swagger')
      .setDescription('Example api')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
