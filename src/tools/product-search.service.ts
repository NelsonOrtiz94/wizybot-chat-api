import { Injectable } from '@nestjs/common';
import { loadProducts } from '../utils/csv-loader';

@Injectable()
export class ProductSearchService {
  async search(query: string): Promise<any[]> {
    const products = await loadProducts();
    const filtered = products.filter((p) =>
      JSON.stringify(p).toLowerCase().includes(query.toLowerCase()),
    );
    return filtered.slice(0, 2);
  }
}
