import { PartialType } from '@nestjs/swagger';
import { CreatePipedriveDto } from './create-pipedrive.dto';

export class UpdatePipedriveDto extends PartialType(CreatePipedriveDto) {}
