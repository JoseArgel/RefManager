import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class RefsDto {
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
