import { Module } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { DeployController } from './deploy.controller';
import { JsonSchema, JsonSchemaSchema } from "../schemas/jsonSchema";
import { RouterHistory, RouterHistorySchema } from "../schemas/routerHistory";
import { DeployRecord, DeployRecordSchema } from '../schemas/deployRecord';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildService } from '../build/build.service';

@Module({
  imports: [MongooseModule.forFeature([
      { name: JsonSchema.name, schema: JsonSchemaSchema },
      { name: RouterHistory.name, schema: RouterHistorySchema },
      { name: DeployRecord.name, schema: DeployRecordSchema },
  ])],
  providers: [DeployService, BuildService],
  controllers: [DeployController]
})
export class DeployModule {}
