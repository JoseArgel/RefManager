import { Module } from '@nestjs/common';
import { StylesController } from './styles.controller';
import { StylesService } from './styles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StylesSchema } from './schemas/styles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Style', schema: StylesSchema },
    ]),
  ],
  controllers: [StylesController],
  providers: [StylesService],
})
export class StylesModule {}