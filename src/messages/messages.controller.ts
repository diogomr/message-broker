import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { MessageDto } from './message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

  constructor(private readonly messagesService: MessagesService) {
  }

  @HttpCode(201)
  @Post()
  process(@Body() message: MessageDto): Promise<void> {
    return this.messagesService.process(message).then(() => null);
  }

  @Get()
  retrieve(): Promise<MessageDto> {
    return this.messagesService.retrieve().then((doc) => {
      if (!doc) {
        return null;
      }

      return {
        id: doc.externalId,
        payload: doc.payload,
      };
    });
  }
}
