import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesDto } from './dto/styles.dto';
import { UpdateStyleDto } from './dto/updatestyle.dto';

@Controller('styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  // find one by id findOne(id)

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stylesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.stylesService.findAll();
  }

  @Post()
  create(@Body() style: StylesDto) {
    return this.stylesService.create(style);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyles: UpdateStyleDto) {
    return this.stylesService.update(id, updateStyles);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stylesService.remove(id);
  }
}
