import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsDto } from './dto/fields.dto';
import { UpdateFieldDto } from './dto/updatefield.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.fieldsService.findAll();
  }

  @Post()
  create(@Body() field: FieldsDto) {
    return this.fieldsService.create(field);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFields: UpdateFieldDto) {
    return this.fieldsService.update(id, updateFields);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldsService.remove(id);
  }
}
