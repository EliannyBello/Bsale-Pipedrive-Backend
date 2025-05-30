import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BsaleService } from './bsale.service';
import { BsaleToken, BsaleTokenSchema } from './entities/bsale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BsaleToken.name, schema: BsaleTokenSchema },
    ]),
  ],
  providers: [BsaleService],
  exports: [BsaleService], 
})
export class BsaleModule {}
