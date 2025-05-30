import { Module } from '@nestjs/common';
import { BsaleService } from './bsale.service';
import { BsaleController } from './bsale.controller';

@Module({
  controllers: [BsaleController],
  providers: [BsaleService],
})
export class BsaleModule {}
