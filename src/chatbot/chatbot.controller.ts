import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async chat(@Body('message') message: string) {
    return { response: await this.chatbotService.chat(message) };
  }

  @Get('test-env')
  testEnv() {
    return this.chatbotService.testEnv();
  }
}
