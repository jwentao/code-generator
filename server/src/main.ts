import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/interceptor/http-exception.filter';
import { TransformInterceptor } from "./core/interceptor/transform.interceptor";
import { API_SERVER_PORT, CORS_WHITELSIT } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin(requestOrigin, callback) {
      const result = !!CORS_WHITELSIT.filter(
          item => requestOrigin && requestOrigin.indexOf(item) !== -1,
      ).length;

      callback(null, result);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  await app.listen(API_SERVER_PORT);
  console.log('listening:', API_SERVER_PORT);

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
