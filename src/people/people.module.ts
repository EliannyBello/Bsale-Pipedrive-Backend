import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Client, ClientSchema } from '../client/entities/client.entity';
import { Person, PersonSchema } from './entities/person.entity';
import { PipedriveService } from '../shared/pipedrive/pipedrive.service';
import { PipedriveToken, PipedriveTokenSchema } from '../shared/pipedrive/entities/pipedrive.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Person.name, schema: PersonSchema },
      { name: PipedriveToken.name, schema: PipedriveTokenSchema },
    ]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PipedriveService],
  exports: [PeopleService],
})
export class PeopleModule {}
