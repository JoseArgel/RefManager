import { Injectable } from '@nestjs/common';
import { Styles } from './schemas/styles.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StylesDto } from './dto/styles.dto';
import { UpdateStyleDto } from './dto/updatestyle.dto';

@Injectable()
export class StylesService {
  constructor(
    @InjectModel('Style')
    private readonly styleModel: Model<Styles>,
  ) {}
  
  private styles: any[] = [];

  async findOne(id: string): Promise<Styles[]> {
    const styles = await this.styleModel.find({ _id: id }).exec();
    return styles;
  }

  async findAll(): Promise<Styles[]> {
    const sources = await this.styleModel.find().exec();
    return sources;
  }

  create(style: StylesDto): Promise<Styles> {
    const createdStyles = new this.styleModel(style);
    return createdStyles.save();
  }

  async update(id: string, StylesDto: UpdateStyleDto): Promise<Styles> {
    const updateStyles = await this.styleModel.findByIdAndUpdate(id, StylesDto, { new: true }).exec();
    if (!updateStyles) {
      throw new Error('No se pudo encontrar el estilo');
    }
    return updateStyles;
  }

  remove(id: string) {
    return this.styleModel.findByIdAndDelete(id).exec();
  }
}


  
