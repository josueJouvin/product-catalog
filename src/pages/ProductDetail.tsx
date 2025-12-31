import { Box, Button, Chip, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { FavoriteToggleButton } from '../components/FavoriteToggleButton';
import { ProductNotFound } from '../components/ProductNotFound';
import { useProducts } from '../hooks/useProducts';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, toggleFavorite } = useProducts();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <Box maxWidth={1200} mx="auto" px={4} py={6}>
      <Button
        variant="text"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        ← Volver al catálogo
      </Button>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={6}>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 3,
              boxShadow: 4,
              bgcolor: '#fff',
              p: 2,
            }}
          />
        </Box>

        <Box flex={1}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
          >
            <Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={`ID: ${product.id}`}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
                <Chip
                  label={product.category}
                  color="secondary"
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Typography variant="h3" fontWeight={800} color="primary" mb={1}>
                {product.title}
              </Typography>
            </Box>
            <FavoriteToggleButton
              favorite={product.favorite}
              onToggle={() => toggleFavorite(product.id)}
              size="large"
            />
          </Box>

          <Typography variant="h4" color="primary" fontWeight={900} mb={3}>
            ${product.price}
          </Typography>

          <Typography variant="h6" fontWeight={600} mb={1}>
            Descripción
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            lineHeight={1.8}
            mb={4}
          >
            {product.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
