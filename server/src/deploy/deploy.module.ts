import { Module } from '@nestjs/common';
import { DeployService } from './deploy.service';
import { DeployController } from './deploy.controller';
import { JsonSchema, JsonSchemaSchema } from "../schemas/jsonSchema";
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: JsonSchema.name, schema: JsonSchemaSchema }])],
  providers: [DeployService],
  controllers: [DeployController]
})
export class DeployModule {}
