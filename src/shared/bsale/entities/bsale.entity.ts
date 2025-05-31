import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class BsaleToken {
  //codigo multivende
  @Prop({ required: true })
  accessToken: string;
  urlBsale: string;
}

export type BsaleTokenDocument = HydratedDocument<BsaleToken>;

export const BsaleTokenSchema =
  SchemaFactory.createForClass(BsaleToken);