import { Module } from '@nestjs/common';
import { FieldsController } from './fields.controller';
import { FieldsService } from './fields.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldsSchema } from './schemas/fields.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Field', schema: FieldsSchema },
    ]),
  ],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class FieldsModule {}
