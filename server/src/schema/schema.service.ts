import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateSchemaRequest, SchemaListResponse } from '../types';

@Injectable()
export class SchemaService {
  constructor(
    @InjectModel(JsonSchema.name) private readonly jsonSchemaModal: Model<JsonSchemaDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) {
  }

  async getSchemaList(): Promise<[null | Error, SchemaListResponse | null]> {
    try {
      const count = await this.jsonSchemaModal.countDocuments();
      const list: JsonSchemaDocument[] = await this.jsonSchemaModal.find();
      return [null, {
        total: count,
        list: list.map(item => ({
          id: item._id,
          createUser: item.createUser,
          createTime: item.createTime
        }))
      }];
    } catch (e) {
      return [new Error(e), null];
    }
  }

  async createSchema(body: CreateSchemaRequest): Promise<[null | Error, JsonSchemaDocument | null]> {
    try {
      const data = await this.jsonSchemaModal.create({
        createUser: 'admin',
        scheme: JSON.stringify(body.config),
        updateUser: 'admin',
      });
      return [null, data]
    } catch (e) {
      return [new Error(e), null];
    }
  }
}
