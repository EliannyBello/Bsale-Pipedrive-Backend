import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class BsaleToken {
  //codigo multivende
  @Prop({ required: true })
  accessToken: string;

  //url de la api de bsale
  @Prop({ required: true })
  urlBsale: string;
}

export type BsaleTokenDocument = HydratedDocument<BsaleToken>;

export const BsaleTokenSchema =
  SchemaFactory.createForClass(BsaleToken);