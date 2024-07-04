import { PartialType } from '@nestjs/mapped-types';
import { ReferencesDto } from './references.dto';

export class UpdateReferenceDto extends PartialType(ReferencesDto) {}