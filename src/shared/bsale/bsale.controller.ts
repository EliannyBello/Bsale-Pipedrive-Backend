import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BsaleService } from './bsale.service';
import { CreateBsaleDto } from './dto/create-bsale.dto';
import { UpdateBsaleDto } from './dto/update-bsale.dto';

@Controller('bsale')
export class BsaleController {
  constructor(private readonly bsaleService: BsaleService) {}

  @Post()
  create(@Body() createBsaleDto: CreateBsaleDto) {
    return this.bsaleService.create(createBsaleDto);
  }

  @Get()
  findAll() {
    return this.bsaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bsaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBsaleDto: UpdateBsaleDto) {
    return this.bsaleService.update(+id, updateBsaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bsaleService.remove(+id);
  }
}
