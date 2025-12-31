import { Grid } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { initialProducts } from '../mocks/initialProducts';

export const ProductList = () => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3, lg: 4 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      padding={2}
    >
      {initialProducts.map((product) => (
        <Grid item xs={4} sm={4} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
