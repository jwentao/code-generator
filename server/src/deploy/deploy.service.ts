import { Injectable } from '@nestjs/common';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { RouterHistory, RouterHistoryDocument } from "../schemas/routerHistory";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { CreateDeployRequest } from '../types';
import { BuildService } from '../build/build.service';
import { DeployRecord, DeployRecordDocument } from '../schemas/deployRecord';

@Injectable()
export class DeployService {
    constructor(
      private readonly buildService: BuildService,
      @InjectModel(JsonSchema.name) private readonly jsonSchemaModal: Model<JsonSchemaDocument>,
      @InjectModel(RouterHistory.name) private readonly routerHistoryModal: Model<RouterHistoryDocument>,
      @InjectModel(DeployRecord.name) private readonly deployRecordModal: Model<DeployRecordDocument>,
      @InjectConnection() private readonly connection: mongoose.Connection
    ) {
      this.pushRetryCount = new Map<string, number>();
    }

    pushRetryCount: Map<string, number>


    // async create({ config } : { config: string }):Promise<[null | Error, JsonSchemaDocument | null]> {
    //     console.log('create', config);
    //     try {
    //         const json = await this.jsonSchemaModal.create({
    //             createUser: 'admin',
    //             config,
    //             updateUser: 'admin',
    //         });
    //         console.log(json._id, typeof json._id, json._id.toString());
    //         return [null, json];
    //     } catch (e) {
    //         return [e, null];
    //     }
    // }

    async findAll(): Promise<{ total: number, list: JsonSchema[] }> {
        const count = await this.jsonSchemaModal.countDocuments();
        const list = await this.jsonSchemaModal.find();
        return {
            total: count,
            list
        };
    }

    async find({ id }): Promise<JsonSchema[]> {
        return await this.jsonSchemaModal.findOne({ _id: id });
    }

    async updateRouter(body): Promise<any> {
        // 插入记录 =》 router.json推送至aws =》 成功：更新记录成功 | 失败：更新记录失败并重试
        return this.routerHistoryModal.create({
            ...body,
            status: 2
        }).then(res => {
            this.pushRouter(res.id, body);
            return [null, res];
        }).catch(e =>  [e, null]);
    }

    async pushRouter(id: string, data: object) {
        console.log('pushRouter', `${(this.pushRetryCount[id] || 0) + 1} times`)
        try {
            // todo push router to aws
            // success
            if (this.pushRetryCount[id]) {
                delete this.pushRetryCount[id];
            }
        } catch (e) {
            console.log(`pushRouter error, id=${id}, count: ${this.pushRetryCount.get(id)}`, e);
            if (this.pushRetryCount.has(id)) {
                this.pushRetryCount.set(id, this.pushRetryCount.get(id) + 1);
            } else {
                this.pushRetryCount.set(id, 1);
            }
            if (this.pushRetryCount.get(id) <= 5) {
                setTimeout(() => {
                    this.pushRouter(id, data);
                }, 1000);
            }
        }
    }

    async create(body: CreateDeployRequest) {
        const session = await this.connection.startSession();
        session.startTransaction();
        const user = 'admin'; // todo 从cookie获取
        try {
            let schemaId = body.schemaId;
            // 创建schema
            if (body.config) { // 有config，先创建schema
                const data = await this.jsonSchemaModal
                  .create([{
                      createUser: user,
                      config: JSON.stringify(body.config),
                      updateUser: user,
                  }], { session });
                // @ts-ignore
                schemaId = data[0]._id.toString();
            }

            const mircoName = 'mircoName'; // mock获取mircoName todo 从mircoSchema 用id换取

            const deploySchemaData = (await this.deployRecordModal
              .create([{
                  createUser: user,
                  updateUser: user,
                  mircoId: body.mircoId,
                  schemaId,
                  deployPath: `https://cdn-app.myshopline.com/web/lowcode/${mircoName}`
              }], { session }));

            // @ts-ignore
            const deployId = deploySchemaData[0]._id.toString();

            // build and push to aws
            await this.buildService.build({ name: mircoName, code: body.code, deployId });

            await session.commitTransaction();
            return [null, {
                schemaId,
                mircoId: body.mircoId,
                deployId,
                // @ts-ignore
                deployPath: deploySchemaData[0].deployPath
            }];
        } catch (e) {
            // todo remove lib
            // todo delete aws
            await session.abortTransaction(); // 事务回退
            return [e, null];
        } finally {
            session.endSession();
        }
    }
}
