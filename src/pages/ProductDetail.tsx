import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Box, Button, Chip, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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
              <Chip
                label={product.category}
                color="secondary"
                sx={{ mb: 2, fontWeight: 600, fontSize: 14 }}
              />
              <Typography variant="h3" fontWeight={800} color="primary" mb={1}>
                {product.title}
              </Typography>
            </Box>
            <IconButton
              aria-label={
                product.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
              }
              onClick={() => toggleFavorite(product.id)}
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,215,0,0.2)' },
              }}
            >
              {product.favorite ? (
                <StarIcon sx={{ color: '#FFD700', fontSize: 36 }} />
              ) : (
                <StarBorderIcon sx={{ color: '#FFD700', fontSize: 36 }} />
              )}
            </IconButton>
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
