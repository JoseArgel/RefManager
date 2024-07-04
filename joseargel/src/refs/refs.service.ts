import { Injectable } from '@nestjs/common';
import { Refs } from './schemas/refs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RefsDto } from './dto/refs.dto';
import { UpdateRefDto } from './dto/updateref.dto';

@Injectable()
export class RefsService {
  constructor(
    @InjectModel('Ref')
    private readonly refModel: Model<Refs>,
  ) {}

  private refs: any[] = [];

  async findOne(id: string): Promise<Refs[]> {
    const ref = await this.refModel.find({ _id: id }).exec();
    return ref;
  }

  async findAll(): Promise<Refs[]> {
    const refs = await this.refModel.find().exec();
    return refs;
  }

  async create(ref: RefsDto) {
    const newRef = new this.refModel(ref);
    try {
        const createdRef = await newRef.save();
        return createdRef;
    } catch (error) {
        throw new Error(`Error al crear la referencia: ${error.message}`);
    }
  }

    async update(id: string, uupdateRefs: UpdateRefDto): Promise<Refs> {
      return this.refModel.findByIdAndUpdate(id, uupdateRefs, { new: true }).exec();
  }
  

  remove(id: string) {
    return this.refModel.findByIdAndDelete(id).exec();
  }
}