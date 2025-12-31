import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';

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
        <IconButton
          aria-label={
            product.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
          }
          sx={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: 'rgba(255,215,0,0.2)',
            },
          }}
          size="small"
          onClick={() => toggleFavorite(product.id)}
        >
          {product.favorite ? (
            <StarIcon sx={{ color: '#FFD700', fontSize: 28 }} />
          ) : (
            <StarBorderIcon sx={{ color: '#FFD700', fontSize: 28 }} />
          )}
        </IconButton>
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
      <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="h5"
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          ${product.price}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2, fontWeight: 600, borderRadius: 2 }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Ver más
        </Button>
      </CardContent>
    </Card>
  );
};
