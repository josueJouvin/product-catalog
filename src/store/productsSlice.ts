import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialProducts } from '../mocks/initialProducts';
import { Product } from '../types/product';
import { RootState } from './store';

interface ProductsState {
  items: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  items: initialProducts,
  loading: false,
};

/**
 * productsSlice
 *
 * Slice de Redux encargado de manejar el estado de los productos y sus favoritos.
 * Incluye el reducer toggleFavorite para alternar el estado de favorito de un producto.
 *
 * Los selectores y lógica de acceso a datos se definen aquí para mantener la separación de responsabilidades:
 *   - El slice gestiona el estado global y la lógica de negocio centralizada.
 *   - Los hooks (como useProducts) se encargan de conectar la UI con el estado.
 *
 * Esto permite reutilizar los selectores en cualquier parte de la app, mantener la lógica desacoplada de la UI y facilitar el testing.
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Alterna el estado de favorito de un producto dado su id.
     * @param state Estado actual de productos
     * @param action id del producto a alternar
     */
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.favorite = !product.favorite;
      }
    },
  },
});

export const { toggleFavorite } = productsSlice.actions;

/**
 * Selector para obtener todos los productos del estado global.
 */
export const selectProductsItems = (state: RootState) => state.products.items;

/**
 * Selector memoizado para obtener solo los productos marcados como favoritos.
 */
export const selectFavorites = createSelector([selectProductsItems], (items) =>
  items.filter((p) => p.favorite)
);

/**
 * Selector memoizado para calcular el precio total de los productos favoritos.
 */
export const selectFavoritesTotalPrice = createSelector(
  [selectFavorites],
  (favorites) => favorites.reduce((sum, p) => sum + p.price, 0)
);

/**
 * Selector memoizado para obtener la cantidad total de productos favoritos.
 */
export const selectFavoritesTotalCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export default productsSlice.reducer;
