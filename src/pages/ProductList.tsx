import { Grid } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const { products, toggleFavorite } = useProducts();
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 4 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      padding={2}
    >
      {products.map((product) => (
        <Grid item xs={4} sm={4} md={4} key={product.id}>
          <ProductCard product={product} toggleFavorite={toggleFavorite} />
        </Grid>
      ))}
    </Grid>
  );
};
