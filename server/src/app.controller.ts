import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/child')
  getChild(): object {
    throw new HttpException('文章已存在', 401);
  }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/init')
  init(@Query() query ): Promise<string> {
    return this.appService.init(query);
  }
}
