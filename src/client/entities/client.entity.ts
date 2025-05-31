import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EnumState } from 'src/common/enums/enums';

@Schema()
export class Client {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  code: string;

  @Prop()
  phone: string;

  @Prop()
  company: string;

  @Prop()
  note: string;

  @Prop()
  facebook: string;

  @Prop()
  twitter: string;

  @Prop()
  hasCredit: number;

  @Prop()
  maxCredit: number;

  @Prop()
  state: number;

  @Prop()
  activity: string;

  @Prop()
  city: string;

  @Prop()
  commerciallyBlocked: number;

  @Prop()
  municipality: string;

  @Prop()
  address: string;

  @Prop()
  companyOrPerson: number;

  @Prop()
  accumulatePoints: number;

  @Prop()
  points: number;

  @Prop()
  pointsUpdated: string;

  @Prop()
  sendDte: number;

  @Prop()
  isForeigner: number;

  @Prop()
  prestashopClienId: number;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop({
    type: String,
    enum: EnumState,
    default: EnumState.PENDING
  })
  status: EnumState;

}

export type ClientDocument = HydratedDocument<Client>;
export const ClientSchema = SchemaFactory.createForClass(Client);
