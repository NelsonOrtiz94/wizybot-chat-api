import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatDto } from './dto/chat.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Chatbot')
@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to the chatbot' })
  @ApiBody({ type: ChatDto })
  async chat(@Body() body: ChatDto) {
    return { response: await this.chatbotService.chat(body.message) };
  }

  @Get('test-env')
  @ApiOperation({ summary: 'Check if OpenAI API key is correctly loaded' })
  testEnv() {
    return this.chatbotService.testEnv();
  }
}
