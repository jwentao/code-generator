import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { CreateAndDeploySchemaRequest, CreateSchemaRequest, SchemaListResponse } from '../types';
import { BuildService } from '../build/build.service';

@Injectable()
export class SchemaService {
  constructor(
    private readonly buildService: BuildService,
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

  async createAndDeploySchema(body: CreateAndDeploySchemaRequest) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      // 创建schema
      // const data = await this.jsonSchemaModal
      //   .create({
      //   createUser: 'admin',
      //   scheme: JSON.stringify(body.config),
      //   updateUser: 'admin',
      // }, { session });

      const data = await this.buildService.build({ name: body.name, code: body.code });
      console.log('data', data);
      await session.commitTransaction();
      return [null, 'success'];
    } catch (e) {
      // todo remove lib
      // todo delete aws
      await session.abortTransaction();
      return [e, null];
    } finally {
      session.endSession();
    }
  }
}
