import { IsNotEmpty, IsString } from 'class-validator';

export class StylesDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

}
