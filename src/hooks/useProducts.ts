/**
 * Custom hook useProducts
 *
 * Este hook centraliza la lógica de acceso y manipulación de productos en el catálogo, incluyendo el manejo de favoritos.
 * Utiliza Redux para obtener el listado de productos, el total de favoritos y el precio total de favoritos.
 * Expone una función para alternar el estado de favorito de un producto, optimizada con useCallback para evitar renders innecesarios.
 *
 * @returns:
 *   - products: Lista de productos del estado global
 *  - isLoading: Estado de carga de productos
 *  - error: Mensaje de error al cargar productos
 *   - toggleFavorite: Función para alternar el estado de favorito de un producto
 *   - totalFavoritesPrice: Precio total de productos marcados como favoritos
 *   - totalFavoritesCount: Cantidad total de productos favoritos
 *
 * Este hook debe usarse en componentes que requieran mostrar o interactuar con productos y favoritos, manteniendo la lógica desacoplada de la UI.
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
