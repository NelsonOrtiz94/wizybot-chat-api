// Load environment variables from .env
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Swagger API documentation setup
  const config = new DocumentBuilder()
    .setTitle('Wizybot Chat API')
    .setDescription('Chatbot API using OpenAI and custom tools')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
