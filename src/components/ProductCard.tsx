import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    favorite: boolean;
    image: string;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="h5" color="primary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};
