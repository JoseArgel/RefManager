import { PartialType } from '@nestjs/mapped-types';
import { StylesDto } from './styles.dto';

export class UpdateStyleDto extends PartialType(StylesDto) {}