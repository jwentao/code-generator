import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type MountRecordDocument = MountRecord & Document;

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
    mainId: string; // 主应用id

    @Prop( { required: true })
    microId: string; // 微应用id
}

export const MountRecordSchema = SchemaFactory.createForClass(MountRecord);
