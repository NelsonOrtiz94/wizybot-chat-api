import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async chat(@Body() body: ChatDto) {
    return { response: await this.chatbotService.chat(body.message) };
  }

  @Get('test-env')
  testEnv() {
    return this.chatbotService.testEnv();
  }
}
