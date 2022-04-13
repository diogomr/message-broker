import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './messages/message.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb/broker'),
    MongooseModule.forFeature([
        {
          name: Message.name,
          schema: MessageSchema,
        },
      ],
    ),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})

export class AppModule {
}
