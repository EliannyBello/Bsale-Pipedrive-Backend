import { PartialType } from '@nestjs/swagger';
import { CreateBsaleDto } from './create-bsale.dto';

export class UpdateBsaleDto extends PartialType(CreateBsaleDto) {}
