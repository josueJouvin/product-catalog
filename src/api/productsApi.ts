/**
 * API Service para Fake Store API
 *
 * Maneja las llamadas HTTP a la API externa y mapea los datos
 * al formato interno de la aplicación para evitar acoplamiento con el contrato externo.
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
 * Mapea un producto de Fake Store API al formato interno de la aplicación.
 * Agrega el campo 'favorite' que no existe en la API.
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
 * Obtiene todos los productos de Fake Store API.
 * @returns Promise con array de productos mapeados al formato interno
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener productos de la API');
  }

  const data: FakeStoreProduct[] = await response.json();
  return data.map(mapToProduct);
};
