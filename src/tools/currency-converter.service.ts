import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyConverterService {
  async convert(amount: number, from: string, to: string): Promise<number> {
    const apiKey = process.env.EXCHANGE_RATES_API_KEY;
    const res = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const rates = res.data.rates;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const rate = rates[to] / rates[from];
    return amount * rate;
  }
}
