import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchProducts as fetchProductsApi } from '../api/productsApi';
import { initialProducts } from '../mocks/initialProducts';
import { Product } from '../types/product';
import { RootState } from './store';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * AsyncThunk to fetch products from the API.
 * Handles the complete cycle: pending -> fulfilled/rejected
 * Falls back to mock data if API fails.
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const products = await fetchProductsApi();
      return products;
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn('API failed, using mock data:', error);
      return initialProducts;
    }
  }
);

/**
 * productsSlice
 *
 * Redux slice responsible for managing products and favorites state.
 * Includes the toggleFavorite reducer to toggle a product's favorite status.
 *
 * Selectors and data access logic are defined here to maintain separation of concerns:
 *   - The slice manages global state and centralized business logic.
 *   - Hooks (like useProducts) handle connecting the UI with the state.
 *
 * This allows reusing selectors anywhere in the app, keeping logic decoupled from UI and facilitating testing.
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Toggles the favorite status of a product by its id.
     * @param state Current products state
     * @param action Product id to toggle
     */
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const product = state.items.find((p) => p.id === action.payload);
      if (product) {
        product.favorite = !product.favorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar productos';
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;

export const selectProductsItems = (state: RootState) => state.products.items;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;
export const selectFavorites = createSelector([selectProductsItems], (items) =>
  items.filter((p) => p.favorite)
);

/**
 * Memoized selector to calculate total price of favorite products.
 */
export const selectFavoritesTotalPrice = createSelector(
  [selectFavorites],
  (favorites) => favorites.reduce((sum, p) => sum + p.price, 0)
);

/**
 * Memoized selector to get total count of favorite products.
 */
export const selectFavoritesTotalCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export default productsSlice.reducer;
