import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesDto } from './dto/sources.dto';
import { UpdateSourceDto } from './dto/updatesource.dto';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourcesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.sourcesService.findAll();
  }

  @Post()
  create(@Body() source: SourcesDto) {
    return this.sourcesService.create(source);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSources: UpdateSourceDto) {
    return this.sourcesService.update(id, updateSources);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourcesService.remove(id);
  }
}
