import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { formatPrice } from '../utils/formatPrice';
import { FavoriteToggleButton } from './FavoriteToggleButton';

interface ProductCardProps {
  product: Product;
  toggleFavorite: (id: number) => void;
}

export const ProductCard = ({ product, toggleFavorite }: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: 4,
        borderRadius: 3,
        '&:hover': {
          boxShadow: 8,
        },
        overflow: 'visible',
      }}
    >
      <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
        <FavoriteToggleButton
          favorite={product.favorite}
          onToggle={() => toggleFavorite(product.id)}
          size="small"
          variant="overlay"
        />
      </Box>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottom: '1px solid #eee',
        }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}
      >
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`ID: ${product.id}`}
            size="small"
            sx={{ mb: 1, fontWeight: 600 }}
          />
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {product.title}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
            gap: 2,
          }}
        >
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {formatPrice(product.price)}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontWeight: 600, borderRadius: 2 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            Ver más
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
