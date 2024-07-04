import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesDto } from './dto/references.dto';
import { UpdateReferenceDto } from './dto/updatereference.dto';

@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referencesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.referencesService.findAll();
  }

  @Get('fuente/:idsource/estilo/:idstyle')
  findReferencia(
  @Param('idsource') idsource: string, 
  @Param('idstyle') idstyle: string,) {
    return this.referencesService.findReferencia(idsource,idstyle);
  }

  @Post()
  create(@Body() reference: ReferencesDto) {
    console.log('peticion')
    return this.referencesService.create(reference);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReferences: UpdateReferenceDto) {
    return this.referencesService.update(id, updateReferences);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referencesService.remove(id);
  }
}
