import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class ClientSchedule {
  private readonly logger = new Logger(ClientSchedule.name);

  constructor(private readonly clientService: ClientService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.log('Sincronizando clientes de Bsale...');
    try {
      const result = await this.clientService.syncBsaleClients();
      this.logger.log(`Clientes sincronizados: ${result.count}`);
    } catch (error) {
      this.logger.error('Error al sincronizar clientes de Bsale', error);
    }
  }
}