import { Controller, Get } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('sync-bsale')
  async syncBsaleClients() {
    return this.clientService.syncBsaleClients();
  }


}