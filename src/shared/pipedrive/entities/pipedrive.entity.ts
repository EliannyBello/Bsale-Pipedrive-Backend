import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class PipedriveToken {
  //codigo multivende
  @Prop({ required: true })
  apiToken: string;

}

export type PipedriveTokenDocument = HydratedDocument<PipedriveToken>;

export const PipedriveTokenSchema =
  SchemaFactory.createForClass(PipedriveToken);