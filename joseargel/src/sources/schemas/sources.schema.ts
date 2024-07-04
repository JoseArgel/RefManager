import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type SourcesDocument = HydratedDocument<Sources>;
@Schema({ timestamps: true })

//export class Sources extends Document {

  export class Sources {
  @Prop({ required: true })
    nombre: string;
    
}

export const SourcesSchema = SchemaFactory.createForClass(Sources);
