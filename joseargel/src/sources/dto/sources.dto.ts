import { IsNotEmpty, IsString } from 'class-validator';

export class SourcesDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

}
