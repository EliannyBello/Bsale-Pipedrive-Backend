import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PeopleService } from 'src/people/people.service';

@Injectable()
export class PeopleSchedule {
  private readonly logger = new Logger(PeopleSchedule.name);

  constructor(private readonly peopleService: PeopleService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Sincronizando personas con Pipedrive...');
    try {
      const result = await this.peopleService.syncPeopleWithPipedrive();
      this.logger.log(`Personas creadas: ${result.created}, actualizadas: ${result.updated}`);
    } catch (error) {
      this.logger.error('Error al sincronizar personas con Pipedrive', error);
    }
  }
}