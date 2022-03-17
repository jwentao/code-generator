import { Injectable } from '@nestjs/common';
import { JsonSchema, JsonSchemaDocument } from "../schemas/jsonSchema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DeployService {
    constructor(
        @InjectModel(JsonSchema.name) private readonly jsonSchemaModal: Model<JsonSchemaDocument>,
    ) {}


    async create(): Promise<JsonSchema> {
        try {
            const json = await this.jsonSchemaModal.create({
                createUser: 'admin',
                createTime: Date.now(),
                scheme: JSON.stringify({a: '12', b: 'cc'}),
                updateUser: 'admin',
                updateTime: Date.now()
            });
            return json;
        } catch (e) {
            console.log(e);
        }
    }
}
