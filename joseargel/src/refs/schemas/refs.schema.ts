import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Fields } from 'src/fields/schemas/fields.schema';
import { Sources } from 'src/sources/schemas/sources.schema';
import { Styles } from 'src/styles/schemas/styles.schema';
import { RefsDto } from '../dto/refs.dto';

export type RefsDocument = HydratedDocument<Refs>;
@Schema({ timestamps: true })

export class Refs {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sources' })
  source: Sources;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Styles' })
  style: Styles;

  @Prop({ type: RefsDto })
  field: RefsDto[];
}

export const RefsSchema = SchemaFactory.createForClass(Refs);
