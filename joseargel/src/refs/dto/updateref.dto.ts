import { PartialType } from '@nestjs/mapped-types';
import { RefsDto } from './refs.dto';

export class UpdateRefDto extends PartialType(RefsDto) {}