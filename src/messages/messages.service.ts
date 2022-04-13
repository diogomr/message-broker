import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument, Status } from './message.schema';
import { MessageDto } from './message.dto';

@Injectable()
export class MessagesService {

  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
  }

  async process(dto: MessageDto): Promise<MessageDocument> {
    const message: Message = {
      externalId: dto.id,
      payload: dto.payload,
      status: Status.WAITING,
    };
    return new this.messageModel(message).save();
  }

  async retrieve(): Promise<MessageDocument> {

    // Find oldest waiting message to keep processed order
    // Atomically change status to guarantee at-most-once retrieval
    return this.messageModel.findOneAndUpdate(
      { status: Status.WAITING },
      { status: Status.PROCESSED },
      { sort: { 'createdAt': 1 } },
    );
  }
}
