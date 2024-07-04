import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type StylesDocument = HydratedDocument<Styles>;

@Schema({ timestamps: true })

//export class Styles extends Document {

export class Styles {
  @Prop({ required: true })
    nombre: string;
}

export const StylesSchema = SchemaFactory.createForClass(Styles);