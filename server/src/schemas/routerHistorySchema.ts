import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// router更新记录
export type RouterHistoryDocument = RouterHistory & Document;

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
}

export const RouterHistorySchema = SchemaFactory.createForClass(RouterHistory);
