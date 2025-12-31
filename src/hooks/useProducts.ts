/**
 * Custom hook useProducts
 *
 * This hook centralizes the logic for accessing and manipulating products in the catalog, including favorites management.
 * Uses Redux to get the product list, favorites total, and total price of favorites.
 * Exposes a function to toggle a product's favorite status, optimized with useCallback to avoid unnecessary renders.
 *
 * @returns:
 *   - products: Product list from global state
 *   - isLoading: Products loading state
 *   - error: Error message when loading products
 *   - toggleFavorite: Function to toggle a product's favorite status
 *   - totalFavoritesPrice: Total price of products marked as favorites
 *   - totalFavoritesCount: Total count of favorite products
 *
 */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFavoritesTotalCount,
  selectFavoritesTotalPrice,
  selectLoading,
  selectProductsItems,
  toggleFavorite,
} from '../store/productsSlice';
import { AppDispatch } from '../store/store';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProductsItems);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const totalFavoritesPrice = useSelector(selectFavoritesTotalPrice);
  const totalFavoritesCount = useSelector(selectFavoritesTotalCount);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch]
  );

  return {
    products,
    isLoading,
    error,
    toggleFavorite: handleToggleFavorite,
    totalFavoritesPrice,
    totalFavoritesCount,
  };
};
