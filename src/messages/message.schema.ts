import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop()
  externalId: string;

  @Prop({ type: Object })
  payload: object;

  @Prop()
  status: Status;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export enum Status {
  QUEUED,
  CONSUMED,
}

export const MessageSchema = SchemaFactory.createForClass(Message);
