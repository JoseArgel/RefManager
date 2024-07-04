import { Injectable } from '@nestjs/common';
import { Sources } from './schemas/sources.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SourcesDto } from './dto/sources.dto';
import { UpdateSourceDto } from './dto/updatesource.dto';

@Injectable()
export class SourcesService {
  constructor(
    @InjectModel('Source')
    private readonly sourceModel: Model<Sources>,
  ) {}

  private sources: any[] = [];

  async findOne(id: string): Promise<Sources[]> {
    const sources = await this.sourceModel.find({ _id: id }).exec();
    return sources;
  }

  async findAll(): Promise<Sources[]> {
    const sources = await this.sourceModel.find().exec();
    return sources;
  }

  create(source: SourcesDto): Promise<Sources> {
    const createdSources = new this.sourceModel(source);
    return createdSources.save();
  }

  async update(id: string, SourcesDto: UpdateSourceDto): Promise<Sources> {
    const updateSources = await this.sourceModel.findByIdAndUpdate(id, SourcesDto, { new: true }).exec();
    if (!updateSources) {
      throw new Error('No se pudo encontrar la fuente');
    }
    return updateSources;
  }

  remove(id: string) {
    return this.sourceModel.findByIdAndDelete(id).exec();
  }
}
