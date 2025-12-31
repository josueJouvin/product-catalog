import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

interface ProductsState {
  items: Product[];
  loading: boolean;
}

const initialProducts: Product[] = [
  {
    id: 1,
    title: "xxxxxxxxxxx",
    description: "xxxxxxxxxxxxxxxxx",
    price: 0.00,
    category: "xxxxxxxxxxxxxxxxxx",
    image: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    favorite: false,
  },
];

const initialState: ProductsState = {
  items: initialProducts,
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const product = state.items.find(p => p.id === action.payload);
      if (product) {
        product.favorite = !product.favorite;
      }
    },
  },
});

export const { toggleFavorite } = productsSlice.actions;
export default productsSlice.reducer;
