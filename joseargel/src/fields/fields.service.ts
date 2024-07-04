import { Injectable } from '@nestjs/common';
import { Fields } from './schemas/fields.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FieldsDto } from './dto/fields.dto';
import { UpdateFieldDto } from './dto/updatefield.dto';

@Injectable()
export class FieldsService {
  updateFieldName(id: string, newName: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('Field')
    private readonly fieldModel: Model<Fields>,
  ) {}

  private fields: any[] = [];

  async findOne(id: string): Promise<Fields[]> {
    const field = await this.fieldModel.find({ _id: id }).exec();
    return field;
  }

  async findAll(): Promise<Fields[]> {
    const fields = await this.fieldModel.find().exec();
    return fields;
  }

  create(field: FieldsDto): Promise<Fields> {
    const createdFields = new this.fieldModel(field);
    return createdFields.save();
  }

  async update(id: string, FieldsDto: UpdateFieldDto): Promise<Fields> {
    const updateFields = await this.fieldModel.findByIdAndUpdate(id, FieldsDto, { new: true }).exec();
    if (!updateFields) {
      throw new Error('No se pudo encontrar el campo');
    }
    return updateFields;
  }

  remove(id: string) {
    return this.fieldModel.findByIdAndDelete(id).exec();
  }
}
