import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { CreatePipedriveDto } from './dto/create-pipedrive.dto';
import { UpdatePipedriveDto } from './dto/update-pipedrive.dto';

@Controller('pipedrive')
export class PipedriveController {
  constructor(private readonly pipedriveService: PipedriveService) {}

  @Post()
  create(@Body() createPipedriveDto: CreatePipedriveDto) {
    return this.pipedriveService.create(createPipedriveDto);
  }

  @Get()
  findAll() {
    return this.pipedriveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipedriveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipedriveDto: UpdatePipedriveDto) {
    return this.pipedriveService.update(+id, updatePipedriveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipedriveService.remove(+id);
  }
}
