import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
// import * as Raven from 'raven';
import { ENV } from '../../config/app.config';

@Catch() // cache所有错误
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (ENV !== 'development') {
      // Raven.captureException(exception, { // todo sentry 上报 or 其它上报方式
      //   tags: {
      //     service_type: 'server',
      //   },
      // });
    }

    let resBody: any = {
      timestamp: Date.now(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      // http错误
      const e: any = exception;
      const { statusCode, error, message } = e.response;
      resBody = Object.assign(resBody, {
        statusCode,
        error,
        errmsg: message,
      });
      response.status(resBody.statusCode).send(resBody);
    } else {
      const e: any = exception;
      resBody = Object.assign(resBody, {
        code: 0,
        errmsg: e.toString(),
      });
      response.status(200).send(resBody);
    }
  }
}
