import { Injectable } from '@nestjs/common';
import { CreateBsaleDto } from './dto/create-bsale.dto';
import { UpdateBsaleDto } from './dto/update-bsale.dto';

@Injectable()
export class BsaleService {
  create(createBsaleDto: CreateBsaleDto) {
    return 'This action adds a new bsale';
  }

  findAll() {
    return `This action returns all bsale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bsale`;
  }

  update(id: number, updateBsaleDto: UpdateBsaleDto) {
    return `This action updates a #${id} bsale`;
  }

  remove(id: number) {
    return `This action removes a #${id} bsale`;
  }
}
