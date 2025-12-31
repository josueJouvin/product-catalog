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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.favorite = !product.favorite;
      }
    },
  },
});

export const { toggleFavorite } = productsSlice.actions;

export const selectProductsItems = (state: RootState) => state.products.items;

export const selectFavorites = createSelector([selectProductsItems], (items) =>
  items.filter((p) => p.favorite)
);

export const selectFavoritesTotal = createSelector(
  [selectFavorites],
  (favorites) => favorites.reduce((sum, p) => sum + p.price, 0)
);

export default productsSlice.reducer;
