import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { loadProducts } from '../utils/csv-loader';

@Injectable()
export class ProductSearchService {
  /**
   * Searches for up to two products in the CSV that match the user query.
   * @param query The search string from the user.
   * @returns An array with up to two matching product entries.
   */
  async search(query: string): Promise<any[]> {
    try {
      const products = await loadProducts();

      const filtered = products.filter((product) =>
        JSON.stringify(product).toLowerCase().includes(query.toLowerCase()),
      );

      return filtered.slice(0, 2);
    } catch (error) {
      // Log internal error and throw a user-friendly message
      console.error('❌ Error loading products from CSV:', error.message);
      throw new InternalServerErrorException(
        'Unable to load product list. Please try again later.',
      );
    }
  }
}
