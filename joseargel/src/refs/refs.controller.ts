import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
  } from '@nestjs/common';
  import { RefsService } from './refs.service';
  import { RefsDto } from './dto/refs.dto';
  import { UpdateRefDto } from './dto/updateref.dto';
import { Refs } from './schemas/refs.schema';
  
  @Controller('refs')
  export class RefsController {
    refModel: any;
    constructor(private readonly refsService: RefsService) {}
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.refsService.findOne(id);
    }
  
    @Get()
    findAll() {
      return this.refsService.findAll();
    }
  
    @Post()
    create(@Body() ref: RefsDto) {
    console.log('peticion')
    return this.refsService.create(ref);
  }

  @Patch(':id')
  async updateReference(@Param('id') id: string, @Body() updateRefs: UpdateRefDto): Promise<Refs> {
    return this.refsService.update(id, updateRefs);
  }

  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.refsService.remove(id);
  }
}