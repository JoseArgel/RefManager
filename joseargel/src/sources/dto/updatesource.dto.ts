import { PartialType } from '@nestjs/mapped-types';
import { SourcesDto } from './sources.dto';

export class UpdateSourceDto extends PartialType(SourcesDto) {}