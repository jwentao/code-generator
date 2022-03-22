import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MANGO_TIMESTAMPS_TYPE } from '../types';
// router更新记录
export type RouterHistoryDocument = RouterHistory & Document & MANGO_TIMESTAMPS_TYPE;

@Schema({
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})
export class RouterHistory extends Document {
    @Prop({ required: true })
    createUser: string;

    @Prop({ required: true })
    router: string;

    @Prop({ required: true })
    updateUser: string;

    @Prop({ required: '{PATH} is required!', enum: [0, 1, 2] }) // 0失败 1 成功 2pending
    status: number
}

export const RouterHistorySchema = SchemaFactory.createForClass(RouterHistory);
