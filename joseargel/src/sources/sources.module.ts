import { Module } from '@nestjs/common';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SourcesSchema } from './schemas/sources.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Source', schema: SourcesSchema },
    ]),
  ],
  controllers: [SourcesController],
  providers: [SourcesService],
})
export class SourcesModule {}