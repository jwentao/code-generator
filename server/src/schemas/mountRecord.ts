import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MANGO_TIMESTAMPS_TYPE } from '../types';
export type MountRecordDocument = MountRecord & Document & MANGO_TIMESTAMPS_TYPE;

@Schema({
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
})
export class MountRecord extends Document {
    @Prop({ required: true })
    createUser: string;

    @Prop({ required: true })
    updateUser: string;

    @Prop( { required: true })
    deployId: string;

    @Prop( { required: true })
    mainId: string; // 主应用id，和微应用id一对多

    @Prop( { required: true })
    microId: string; // 微应用id
}

export const MountRecordSchema = SchemaFactory.createForClass(MountRecord);
