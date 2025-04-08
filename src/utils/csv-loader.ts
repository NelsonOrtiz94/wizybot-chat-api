import * as fs from 'fs';
import * as csv from 'csv-parser';

export function loadProducts(): Promise<Record<string, string>[]> {
  const results: Record<string, string>[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('products_list.csv')
      .pipe(csv())
      .on('data', (data: Record<string, string>) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}
