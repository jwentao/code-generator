import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeployModule } from './deploy/deploy.module';
// import { ConfigModule } from '@nestjs/config';
import { Config } from './config/config';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [
    MongooseModule.forRoot(Config.getConf('MONGO_CONNECTION')),
    DeployModule,
    SchemaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

