import { Injectable } from '@nestjs/common';
import { CreatePipedriveDto } from './dto/create-pipedrive.dto';
import { UpdatePipedriveDto } from './dto/update-pipedrive.dto';

@Injectable()
export class PipedriveService {
  create(createPipedriveDto: CreatePipedriveDto) {
    return 'This action adds a new pipedrive';
  }

  findAll() {
    return `This action returns all pipedrive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipedrive`;
  }

  update(id: number, updatePipedriveDto: UpdatePipedriveDto) {
    return `This action updates a #${id} pipedrive`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipedrive`;
  }
}
