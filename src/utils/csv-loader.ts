import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';

export function loadProducts(): Promise<Record<string, string>[]> {
  const results: Record<string, string>[] = [];
  const filePath = path.resolve('products_list.csv');

  return new Promise((resolve, reject) => {
    // Check if file exists before attempting to read
    if (!fs.existsSync(filePath)) {
      return reject(new Error('❌ CSV file not found at path: ' + filePath));
    }

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: Record<string, string>) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}
