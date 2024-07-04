import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ReferencesDto {
    @IsNotEmpty()
    @IsString()
    source: string;
   
   
    @IsNotEmpty()
    @IsString()
    style: string;
  
    @IsNotEmpty()
    @IsArray()
    field: [string];
}
