import { Injectable } from '@nestjs/common';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { RouterHistory, RouterHistoryDocument } from "../schemas/routerHistorySchema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeployService {
    constructor(
        @InjectModel(JsonSchema.name) private readonly jsonSchemaModal: Model<JsonSchemaDocument>,
        @InjectModel(RouterHistory.name) private readonly routerHistoryModal: Model<RouterHistoryDocument>,
    ) {}


    async create(): Promise<JsonSchema> {
        try {
            const json = await this.jsonSchemaModal.create({
                createUser: 'admin',
                scheme: JSON.stringify({a: '12', b: 'cc'}),
                updateUser: 'admin',
            });
            return json.save();
        } catch (e) {
            console.log(e);
        }
    }

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

    async updateRouter(): Promise<any> {
        // 插入记录 =》 router.json推送至aws =》 成功：更新记录成功 | 失败：更新记录失败并重试
        return this.routerHistoryModal.create({}).then(res => {
            return [null, res];
        }).catch(e =>  [e, null]);
    }
}
