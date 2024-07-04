import { Module } from '@nestjs/common';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferencesSchema } from './schemas/references.schema';
import { FieldsSchema } from 'src/fields/schemas/fields.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reference', schema: ReferencesSchema },
      { name: 'Fields', schema: FieldsSchema },
    ]),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService],
})
export class ReferencesModule {}
