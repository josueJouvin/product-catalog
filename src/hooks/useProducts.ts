import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavoritesTotalCount,
  selectFavoritesTotalPrice,
  selectProductsItems,
  toggleFavorite,
} from '../store/productsSlice';
import { AppDispatch } from '../store/store';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProductsItems);
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
    toggleFavorite: handleToggleFavorite,
    totalFavoritesPrice,
    totalFavoritesCount,
  };
};
