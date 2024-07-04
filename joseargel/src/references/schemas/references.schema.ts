import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Fields } from 'src/fields/schemas/fields.schema';
import { Sources } from 'src/sources/schemas/sources.schema';
import { Styles } from 'src/styles/schemas/styles.schema';

export type ReferencesDocument = HydratedDocument<References>;
@Schema({ timestamps: true })

export class References {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sources' })
  source: Sources;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Styles' })
  style: Styles;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fields' }] })
  field: Fields[];
}

export const ReferencesSchema = SchemaFactory.createForClass(References);
