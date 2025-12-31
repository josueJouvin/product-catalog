import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

export const ProductList = () => {
  const { products, toggleFavorite, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        flexDirection="column"
        gap={2}
      >
        <Typography variant="h4" color="error">
          Error al cargar productos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

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
