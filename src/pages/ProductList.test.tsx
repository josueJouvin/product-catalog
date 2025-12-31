import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import productsReducer from '../store/productsSlice';
import { ProductList } from './ProductList';

const mockProducts = [
  {
    id: 1,
    title: 'Producto Test 1',
    description: 'Descripción del producto 1',
    price: 100,
    category: 'Categoría 1',
    image: 'https://via.placeholder.com/150',
    favorite: false,
  },
  {
    id: 2,
    title: 'Producto Test 2',
    description: 'Descripción del producto 2',
    price: 200,
    category: 'Categoría 2',
    image: 'https://via.placeholder.com/150',
    favorite: true,
  },
];

const createMockStore = (initialProducts = mockProducts) => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        items: initialProducts,
        loading: false,
      },
    },
  });
};

const renderWithProviders = (
  component: React.ReactElement,
  store = createMockStore()
) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('ProductList', () => {
  it('renders the product list', () => {
    renderWithProviders(<ProductList />);

    expect(screen.getByText('Producto Test 1')).toBeDefined();
    expect(screen.getByText('Producto Test 2')).toBeDefined();
  });

  it('shows the prices of the products', () => {
    renderWithProviders(<ProductList />);

    expect(screen.getByText('$100.00')).toBeDefined();
    expect(screen.getByText('$200.00')).toBeDefined();
  });

  it('shows the "View More" button on each product', () => {
    renderWithProviders(<ProductList />);

    const viewMoreButtons = screen.getAllByText('Ver más');
    expect(viewMoreButtons.length).toBe(2);
  });

  it('permite marcar un producto como favorito', () => {
    const store = createMockStore();
    renderWithProviders(<ProductList />, store);

    const favoriteButtons = screen.getAllByLabelText(/favoritos/i);

    fireEvent.click(favoriteButtons[0]);
    const state = store.getState();
    expect(state.products.items[0].favorite).toBe(true);
  });
});
