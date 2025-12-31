import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import App from './App';
import { store } from './store/store';

describe('App', () => {
  it('renderiza la aplicación sin errores', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('BlueLabel')).toBeDefined();
  });
});
