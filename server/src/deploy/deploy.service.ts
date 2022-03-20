import { Injectable } from '@nestjs/common';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { RouterHistory, RouterHistoryDocument } from "../schemas/routerHistory";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeployService {
    constructor(
        @InjectModel(JsonSchema.name) private readonly jsonSchemaModal: Model<JsonSchemaDocument>,
        @InjectModel(RouterHistory.name) private readonly routerHistoryModal: Model<RouterHistoryDocument>,
    ) {
        this.pushRetryCount = new Map<string, number>();
    }

    pushRetryCount: Map<string, number>


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
}
