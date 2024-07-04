import { Injectable } from '@nestjs/common';
import { References } from './schemas/references.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReferencesDto } from './dto/references.dto';
import { UpdateReferenceDto } from './dto/updatereference.dto';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectModel('Reference')
    private readonly referenceModel: Model<References>,
  ) {}

  private references: any[] = [];

  async findOne(id: string): Promise<References[]> {
    const reference = await this.referenceModel.find({ _id: id }).exec();
    return reference;
  }

  async findAll(): Promise<References[]> {
    const references = await this.referenceModel.find().exec();
    return references;
  }

  async create(reference: ReferencesDto) {

    let r = await this.referenceModel.find({ source: reference.source, style : reference.style  }).exec();
    
    if (r.length == 0){
      const createdReferences = new this.referenceModel(reference);
      return await createdReferences.save();
    }
    else
     return {"mensaje" : 'ya existe una referencia'}
   
  }
  
  async findReferencia(idsource: string, idstyle: string): Promise<References[]> {
    const references = await this.referenceModel.find({ source: idsource, style: idstyle })
      .populate({
        path: 'field',
      })
      .exec();
      return references;
  }
   
    
  async update(id: string, ReferencesDto: UpdateReferenceDto): Promise<References> {
    const updateReferences = await this.referenceModel.findByIdAndUpdate(id, ReferencesDto, { new: true }).exec();
    if (!updateReferences) {
      throw new Error('No se pudo encontrar la referencia');
    }
    return updateReferences;
  }

  remove(id: string) {
    return this.referenceModel.findByIdAndDelete(id).exec();
  }
}
