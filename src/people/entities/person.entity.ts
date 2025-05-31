import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Person {
  @Prop({ required: true, unique: true })
  clientId: number; // Relación con Client

  @Prop()
  pipedriveId: number; // ID en Pipedrive

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);
