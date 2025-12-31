/**
 * API Service for Fake Store API
 *
 * Handles HTTP calls to the external API and maps the data
 * to the application's internal format to avoid coupling with the external contract.
 */

import { Product } from '../types/product';

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_URL = 'https://fakestoreapi.com/products';

/**
 * Maps a product from Fake Store API to the application's internal format.
 * Adds the 'favorite' field which doesn't exist in the API.
 */
const mapToProduct = (apiProduct: FakeStoreProduct): Product => ({
  id: apiProduct.id,
  title: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  category: apiProduct.category,
  image: apiProduct.image,
  favorite: false,
});

/**
 * Fetches all products from Fake Store API.
 * @returns Promise with array of products mapped to internal format
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener productos de la API');
  }

  const data: FakeStoreProduct[] = await response.json();
  return data.map(mapToProduct);
};
