import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,  } from 'mongoose';

export type JsonSchemaDocument = JsonSchema & Document;

@Schema({
    timestamps: true
})
export class JsonSchema extends Document {
    @Prop({ required: true })
    createUser: String;

    @Prop({ required: true })
    createTime: Date;

    @Prop({ required: true })
    scheme: String;

    @Prop({ required: true, type: String })
    updateUser

    @Prop({ required: true })
    updateTime: Date;
}

export const JsonSchemaSchema = SchemaFactory.createForClass(JsonSchema);
