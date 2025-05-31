import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientSchedule } from './schedules/client.schedules';
import { ClientModule } from 'src/client/client.module';
import { PeopleSchedule } from './schedules/people.schedules';
import { PeopleService } from 'src/people/people.service';
import { PeopleModule } from 'src/people/people.module';

@Module({
  providers: [ClientSchedule, PeopleSchedule],
  imports: [ScheduleModule.forRoot(), ClientModule,
  ScheduleModule.forRoot(), PeopleModule],
})
export class JobModule {}
