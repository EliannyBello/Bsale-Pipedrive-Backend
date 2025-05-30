import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipedriveService } from './pipedrive.service';
import { PipedriveToken, PipedriveTokenSchema } from './entities/pipedrive.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PipedriveToken.name, schema: PipedriveTokenSchema },
    ]),
  ],
  providers: [PipedriveService],
  exports: [PipedriveService], 
})
export class PipedriveModule {}
