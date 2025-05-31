import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeopleService } from './people.service';


@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  // @Post()
  // create(@Body() createPersonDto: any) {
  //   return this.peopleService.create(createPersonDto);
  // }

  // @Get()
  // findAll() {
  //   return this.peopleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.peopleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePersonDto: any) {
  //   return this.peopleService.update(+id, updatePersonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.peopleService.remove(+id);
  // }
}
