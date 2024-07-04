import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReferencesModule } from './references/references.module';
import { StylesModule } from './styles/styles.module';
import { FieldsModule } from './fields/fields.module';
import { SourcesModule } from './sources/sources.module';
import { RefsModule } from './refs/refs.module';
//import { ReferencesController } from './references/references.controller';
//import { StylesController } from './styles/styles.controller';
//import { FieldsController } from './fields/fields.controller';
//import { SourcesController } from './sources/sources.controller';
//import { ReferencesService } from './references/references.service';
//import { StylesService } from './styles/styles.service';
//import { FieldsService } from './fields/fields.service';
//import { SourcesService } from './sources/sources.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://jargelburgos78:jargelburgos78@cluster0.vzxefzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ReferencesModule,
    StylesModule,
    FieldsModule,
    SourcesModule,
    RefsModule,
  ],

  controllers: [
    AppController,
    //ReferencesController,
    //StylesController,
    //FieldsController,
    //SourcesController,
    //RefsController,
  ],
  providers: [
    AppService,
    //ReferencesService,
    //StylesService,
    //FieldsService,
    //SourcesService,
    //RefsService,
  ],
})
export class AppModule {}
