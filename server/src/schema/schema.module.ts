import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';
import { JsonSchema, JsonSchemaSchema } from "../schemas/jsonSchema";
import { MongooseModule } from '@nestjs/mongoose';
import { BuildService } from '../build/build.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: JsonSchema.name, schema: JsonSchemaSchema },
  ])],
  providers: [SchemaService, BuildService],
  controllers: [SchemaController]
})
export class SchemaModule {}
