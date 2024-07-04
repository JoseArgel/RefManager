import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type FieldsDocument = HydratedDocument<Fields>;

@Schema({ timestamps: true })

//export class Fields extends Document {

export class Fields {
    @Prop({ required: true })
    nombre: string;
    @Prop({ required: true })
    tipo: string;
}

export const FieldsSchema = SchemaFactory.createForClass(Fields);
