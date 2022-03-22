import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// router更新记录
export type DeployRecordDocument = DeployRecord & Document;

@Schema({
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})
export class DeployRecord extends Document {
    @Prop({ required: true })
    createUser: string;

    @Prop({ required: true })
    mircoId: string;

    @Prop({ required: true})
    deployPath: string
}

export const DeployRecordSchema = SchemaFactory.createForClass(DeployRecord);
