import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MANGO_TIMESTAMPS_TYPE } from '../types';
// deploy记录
export type DeployRecordDocument = DeployRecord & Document & MANGO_TIMESTAMPS_TYPE;

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
    updateUser: string;

    @Prop({ required: true })
    mircoId: string;

    @Prop({ required: true })
    schemaId: string;

    @Prop({ required: true})
    deployPath: string
}

export const DeployRecordSchema = SchemaFactory.createForClass(DeployRecord);
