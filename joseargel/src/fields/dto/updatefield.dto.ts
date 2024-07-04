import { PartialType } from '@nestjs/mapped-types';
import { FieldsDto } from './fields.dto';

export class UpdateFieldDto extends PartialType(FieldsDto) {}