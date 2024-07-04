import { IsNotEmpty, IsString, } from 'class-validator';

export class FieldsDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
 
 
  @IsNotEmpty()
  @IsString()
  tipo: string;
}
