import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientSchedule } from './schedules/client.schedules';
import { ClientModule } from 'src/client/client.module';

@Module({
  providers: [ClientSchedule],
  imports: [ScheduleModule.forRoot(), ClientModule],
})
export class JobModule {}
