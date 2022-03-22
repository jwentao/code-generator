import { Module } from '@nestjs/common';
import { SchemaService } from './schema.service';
import { SchemaController } from './schema.controller';
import { JsonSchema, JsonSchemaSchema } from "../schemas/jsonSchema";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: JsonSchema.name, schema: JsonSchemaSchema },
  ])],
  providers: [SchemaService],
  controllers: [SchemaController]
})
export class SchemaModule {}
