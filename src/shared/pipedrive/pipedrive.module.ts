import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { PipedriveController } from './pipedrive.controller';

@Module({
  controllers: [PipedriveController],
  providers: [PipedriveService],
})
export class PipedriveModule {}
