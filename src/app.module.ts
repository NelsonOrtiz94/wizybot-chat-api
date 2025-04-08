import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 👉 Importa tus servicios y controladores reales:
import { ChatbotController } from './chatbot/chatbot.controller';
import { ChatbotService } from './chatbot/chatbot.service';
import { ProductSearchService } from './tools/product-search.service';
import { CurrencyConverterService } from './tools/currency-converter.service';

@Module({
  imports: [],
  controllers: [AppController, ChatbotController],
  providers: [
    AppService,
    ChatbotService,
    ProductSearchService,
    CurrencyConverterService,
  ],
})
export class AppModule {}
