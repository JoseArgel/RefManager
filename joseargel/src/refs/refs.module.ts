import { Module } from '@nestjs/common';
import { RefsService } from './refs.service';
import { RefsController } from './refs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefsSchema } from './schemas/refs.schema';
import { FieldsSchema } from 'src/fields/schemas/fields.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ref', schema: RefsSchema },
      { name: 'Fields', schema: FieldsSchema },
    ]),
  ],
  providers: [RefsService],
  controllers: [RefsController]
})
export class RefsModule {}
