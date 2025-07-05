import { Controller, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('sync-bsale')
  async syncBsaleClients() {
    return this.clientService.syncBsaleClients();
  }

  @Get()
  async getClients(@Query() query: PaginationQueryDto ) {
    return this.clientService.getAllClient(query)
  }


}