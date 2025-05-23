import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ProductSearchService } from '../tools/product-search.service';
import { CurrencyConverterService } from '../tools/currency-converter.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly productSearch: ProductSearchService,
    private readonly currencyConverter: CurrencyConverterService,
  ) {}

  async chat(userMessage: string): Promise<string> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const functions = [
      {
        name: 'searchProducts',
        description: 'Search products based on a user query',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string' },
          },
          required: ['query'],
        },
      },
      {
        name: 'convertCurrencies',
        description: 'Convert an amount from one currency to another',
        parameters: {
          type: 'object',
          properties: {
            amount: { type: 'number' },
            from: { type: 'string' },
            to: { type: 'string' },
          },
          required: ['amount', 'from', 'to'],
        },
      },
    ];

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
      functions,
      function_call: 'auto',
    });

    const message = chatCompletion.choices[0].message;

    if (message.function_call) {
      const { name, arguments: argsJson } = message.function_call;
      const args = JSON.parse(argsJson || '{}');

      if (name === 'searchProducts') {
        const results = await this.productSearch.search(args.query);
        const followup = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: userMessage },
            message,
            {
              role: 'function',
              name,
              content: JSON.stringify(results),
            },
          ],
        });
        return followup.choices[0].message.content || '';
      }

      if (name === 'convertCurrencies') {
        const result = await this.currencyConverter.convert(
          args.amount,
          args.from,
          args.to,
        );
        const followup = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: userMessage },
            message,
            {
              role: 'function',
              name,
              content: result.toString(),
            },
          ],
        });
        return followup.choices[0].message.content || '';
      }
    }

    return message.content || '';
  }

  testEnv(): string {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return '❌ OPENAI_API_KEY is missing or not loaded from .env';
    }
    return '✅ OPENAI_API_KEY is loaded and accessible.';
  }
}
